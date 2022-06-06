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
  console.log('pid: ', pid);
  console.log('req body', req.body);
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
    await database('order_items').insert({
      order_id: orderId,
    });
    const billId = await database('bill').insert({
      billing_object: false,
      order_id: orderId,
      customer_id: req.body.customerId,
      staff_id: req.body.staffId,
      total_price: req.body.totalPrice,
      service_tip: req.body.serviceTip,
      point_earned: req.body.pointEarned,
      point_used: req.body.pointUsed,
      discount: req.body.discount,
      tax: req.body.tax,
      note: req.body.note,
      status: false,
    });
    return res.status(200).json({billId, orderId});
  }
};
