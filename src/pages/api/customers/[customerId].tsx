import jwtAuth from 'middleware/jwt';
import database from '../../../database';
import {NextApiResponse, NextApiRequest} from 'next';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
    responseLimit: '10mb',
  },
};

const getCustomerDetail = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: {customerId},
    method,
  } = req;

  switch (method) {
    case 'GET': {
      const customer = await database('customers')
        .leftJoin('users', 'users.id', 'customers.user_id')
        .where('customers.user_id', customerId)
        .where('customers.is_deleted', 0)
        .where('users.is_deleted', 0)
        .first(
          'users.id as id',
          'card_id as cardId',
          'first_name as firstName',
          'last_name as lastName',
          'phone_number as phoneNumber',
          'users.email',
          'users.age',
          'customers.birthday',
          'users.address',
          'avatar',
          'gender',
        );

      if (!customer) return res.status(404).send('Not Found');

      const [totalPoints] = await database('exchange_points')
        .where('customer_id', customerId)
        .sum('points as totalPoints');
      const concatTotalPoint = totalPoints.totalPoints ?? {totalPoints: 0};

      return res.status(200).send({...customer, ...concatTotalPoint});
    }
    case 'PATCH': {
      const {
        firstName,
        lastName,
        phoneNumber,
        birthday,
        address,
        avatar,
        gender,
      } = req.body;

      const customerInfo = {
        birthday,
        avatar,
        gender,
      };
      await database('customers')
        .where('user_id', customerId)
        .update(customerInfo);

      const userInfo = {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        address,
      };
      await database('users').where('id', customerId).update(userInfo);

      return res.status(200).send({message: 'Update successfully.'});
    }
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default jwtAuth(getCustomerDetail);
