import database from '../../../database';
import {NextApiRequest, NextApiResponse} from 'next/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: {pid},
  } = req;

  if (!pid) return res.status(404).json({message: 'Not found'});
  if (method === 'PATCH') {
    try {
      const customer = await database('customers').where('id', pid).update({
        is_deleted: true,
      });
      const customerName = await database('customers')
        .where('id', customer)
        .select('first_name as firstName');
      console.log('customerName', customerName);
      return res.status(200).json({
        message: `Successfully deleted customer: ${customerName[0].firstName}`,
      });
    } catch (error) {
      console.log('error', error);
      return res.status(400).send({message: `${error}`});
    }
  }
};
