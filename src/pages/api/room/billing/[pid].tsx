import database from '../../../../database';
import {NextApiRequest, NextApiResponse} from 'next/types';
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb', // Set desired value here
    },
    responseLimit: '6mb',
  },
};
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: {pid},
    method,
  } = req;

  if (!pid) {
    return res.status(404).json({
      message: 'Not Found',
    });
  }
  if (method === 'POST') {
    const orderId = await database('order').insert({
      room_id: pid,
      user_id: req.body.userId,
    });
    return res.status(200).json({orderId});
  }
};
