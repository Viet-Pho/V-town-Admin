import database from '../../database';
import moment from 'moment';

export default async function customerHandler(req, res) {
  const {
    query: {cardNumber, cardId, searchText = '', page = 1, limit = 20},
    method,
  } = req;

  switch (method) {
    case 'GET': {
      let queryBuilder = database('customers')
        .leftJoin('cards', 'cards.id', 'customers.card_id')
        .where('customers.is_deleted', false);
      if (!!cardId) queryBuilder = queryBuilder.where('code', cardId);
      if (!!cardNumber)
        queryBuilder = queryBuilder.where('card_number', cardNumber);
      if (!!searchText) {
        const likeStringSearchText = `%${searchText}%`;
        queryBuilder = queryBuilder
          .whereLike('card_number', likeStringSearchText)
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
          'card_number as cardNumber',
          'first_name as firstName',
          'last_name as lastName',
          'phone_number as phoneNumber',
          'email',
          'address',
          'cards.is_deleted as cardDeleted',
        )
        .sum({totalPoints: 'exchange_points.points'})
        .groupBy('customers.id');

      res.status(200).json({total, customers});
      break;
    }
    case 'POST': {
      let queryBuilder = database('customers');
      if (!!cardId) queryBuilder = queryBuilder.where('card_id', cardId);
      const addUsers = await queryBuilder.insert({
        card_id: req.body.cardId,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        phone_number: req.body.phoneNumber,
        address: req.body.address,
        age: req.body.age,
        gender: req.body.gender,

        is_deleted: false,
        birthday: moment(req.body.birthday).format('YYYY-MM-DD'),
      });
      res.status(200).json(addUsers);
      break;
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
