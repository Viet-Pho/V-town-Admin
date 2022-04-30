import database from '../../database';
import moment from 'moment';

export default async function customerHandler(req, res) {
  const {
    query: {code, cardId, page = 1, limit = 20},
    method,
  } = req;

  switch (method) {
    case 'GET':
      {
        let queryBuilder = database('customers');
        if (!!cardId) queryBuilder = queryBuilder.where('code', cardId);
        if (!!code) queryBuilder = queryBuilder.where('code', code);
        const users = await queryBuilder
          .where('is_deleted', false)
          .offset((page - 1) * limit)
          .limit(limit)
          .select(
            'id',
            'card_id',
            'code',
            'first_name as firstName',
            'last_name as lastName',
            'phone_number as phoneNumber',
            'email',
            'address',
          );
        res.status(200).json(users);
        break;
      }
    case 'POST':
      {
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
