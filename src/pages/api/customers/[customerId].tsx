import jwtAuth from 'middleware/jwt';
import database from '../../../database';
import {NextApiResponse, NextApiRequest} from 'next';

const getCustomerDetail = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: {customerId},
    method,
  } = req;

  switch (method) {
    case 'GET':
      const customer = await database('customers')
        .leftJoin('cards', 'cards.card_number', 'customers.card_id')
        .where('customers.id', customerId)
        .where('customers.is_deleted', 0)
        .first(
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
        );

      const [totalPoints] = await database('exchange_points')
        .where('customer_id', customerId)
        .sum('points as totalPoints');

      return res.status(200).send({...customer, ...totalPoints});
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default jwtAuth(getCustomerDetail);
