import jwtAuth from 'middleware/jwt';
import database from '../../database';
import moment from 'moment';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb', // Set desired value here
    },
    responseLimit: '6mb',
  },
};
const customerHandler = async (req, res) => {
  const {
    query: {cardId, searchText = '', page = 1, limit = 20},
    method,
  } = req;

  switch (method) {
    case 'GET': {
      let queryBuilder = database('customers')
        .leftJoin('cards', 'cards.card_number', 'customers.card_id')
        .where('customers.is_deleted', false);

      if (!!cardId) queryBuilder = queryBuilder.where('card_id', cardId);
      if (!!searchText) {
        const likeStringSearchText = `%${searchText}%`;
        queryBuilder = queryBuilder
          .whereLike('card_id', likeStringSearchText)
          .orWhereLike('phone_number', likeStringSearchText)
          .orWhereLike('first_name', likeStringSearchText)
          .orWhereLike('last_name', likeStringSearchText)
          .orWhereLike('email', likeStringSearchText)
          .orWhereLike('address', likeStringSearchText);
      }

      // Disable full_group_by mode
      await database.raw('SET sql_mode = "";');
      const {total} =
        (await queryBuilder.clone().count('customers.id as total').first()) ||
        {};

      const customers = await queryBuilder
        .leftJoin(
          'exchange_points',
          'exchange_points.customer_id',
          'customers.id',
        )
        .offset((page - 1) * limit)
        .limit(limit)
        .select(
          'customers.id as id',
          'card_id as cardId',
          'first_name as firstName',
          'last_name as lastName',
          'phone_number as phoneNumber',
          'email',
          'age',
          'birthday',
          'address',
          'cards.is_deleted as cardDeleted',
          'avatar',
          'gender',
        )
        .sum({totalPoints: 'exchange_points.points'})
        .groupBy('customers.id');

      res.status(200).json({total, customers});
      break;
    }
    // case 'POST': {
    //   let queryBuilder = database('customers');
    //   if (!!cardId) queryBuilder = queryBuilder.where('card_id', cardId);
    //   const addUsers = await queryBuilder.insert({
    //     card_id: req.body.cardId,
    //     first_name: req.body.firstName,
    //     last_name: req.body.lastName,
    //     email: req.body.email,
    //     phone_number: req.body.phoneNumber,
    //     address: req.body.address,
    //     age: req.body.age,
    //     gender: req.body.gender,
    //     is_deleted: false,
    //     birthday: moment(req.body.birthday).format('YYYY-MM-DD'),
    //   });
    //   res.status(200).json(addUsers);
    //   break;
    // }
    // default:
    //   res.setHeader('Allow', ['GET', 'POST']);
    //   res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default jwtAuth(customerHandler);
