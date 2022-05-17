import database from '../../database';
import moment from 'moment';

export default async function customerHandler(req, res) {
  const {
    query: {cardId, page = 1, limit = 20},
    method,
  } = req;

  switch (method) {
    case 'GET':
      let queryBuilder = database('customers');
      if (!!cardId) queryBuilder = queryBuilder.where('code', cardId);
      const users = await queryBuilder
        .where('is_deleted', false)
        .offset((page - 1) * limit)
        .limit(limit)
        .select(
          'id',
          'card_id',
          'first_name as firstName',
          'last_name as lastName',
          'phone_number as phoneNumber',
          'email',
          'address',
        );
      res.status(200).json(users);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
