import database from '../../database';
import {NextApiResponse, NextApiRequest} from 'next';

export default async function customerHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    body: {customerId, userId, points},
    method,
  } = req;

  switch (method) {
    case 'POST':
      if (!customerId || !userId || !points)
        return res.status(400).send('Bad Request');
      if (typeof points !== 'number' || Number.isNaN(points))
        return res.status(400).send('Bad Request');

      const customer = await getCustomer(customerId);
      if (!customer || !customer.id) return res.status(404).send('Not Found');

      const user = await getUser(userId);
      if (!user || !user.id) return res.status(404).send('Not Found');

      const addedExchangePoint = {
        customer_id: customerId,
        user_id: userId,
        points,
      };
      await database('exchange_points').insert(addedExchangePoint);

      return res.status(200).send('Ok');
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function getCustomer(id) {
  return database('customers')
    .where('is_deleted', false)
    .where('id', id)
    .first();
}

async function getUser(id) {
  return database('users').where('is_deleted', false).where('id', id).first();
}
