import database from '../../database';
import jwtAuth from 'middleware/jwt';
import {NextApiResponse} from 'next/types';

const billHandler = async (req, res: NextApiResponse) => {
  const {method} = req;
  if (method === 'GET') {
    const billList = await database('bill').select(
      'id',
      'billing_object as billingObject',
      'order_id as orderId',
      'customer_id as customerId',
      'staff_id as staffId',
      'total_price as totalPrice',
      'service_tip as serviceTip',
      'discount',
      'tax',
      'point',
      'note',
      'status',
    );
    return res.status(200).json(billList);
  }
  if (method === 'POST') {
    const {orderId, customerId, tax, tip, totalPrice, roomId, discountPoint} =
      req.body;

    const {role} = req.user;
    if (![1, 2].includes(role))
      return res
        .status(403)
        .json({message: "You don't have permission to do this action."});

    const newBill = {
      billing_object: 0,
      order_id: orderId,
      customer_id: customerId || null,
      staff_id: req?.user?.id,
      // point_earned:
      // point_used:
      // discount:
      tax,
      service_tip: tip,
      total_price: totalPrice,
      point_used: discountPoint,
    };

    await database('bill').insert(newBill);
    await database('order').where('id', orderId).update({status: 2});
    await database('rooms').where('id', roomId).update({availability: 1});

    return res.status(200).send({message: 'Create bill successful.'});
  }

  res.setHeader('Allow', ['POST', 'GET']);
  return res.status(405).end(`Method ${method} Not Allowed`);
};

export default jwtAuth(billHandler);
