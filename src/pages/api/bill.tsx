import database from '../../database';
import {NextApiRequest, NextApiResponse} from 'next/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
    // const roomList = await database('rooms')
    //   .join('room_type', 'rooms.room_type', '=', 'room_type.type')
    //   .select(
    //     'rooms.id',
    //     'rooms.name',
    //     'rooms.room_type as roomType',
    //     'rooms.location',
    //     'rooms.wallpaper',
    //     'rooms.availability',
    //     'rooms.room_type as roomType',
    //     'room_type.type_name as typeName',
    //     'room_type.area_size as areaSize',
    //     'room_type.max_num_ppl as maxNumPpl',
    //     'room_type.weekday_price as weekdayPrice',
    //     'room_type.weekend_price as weekendPrice',
    //     'room_type.extra_time_charge as extraTimeCharge',
    //   );
    return res.status(200).json(billList);
  }
  // if (method === 'POST') {
  //   const orderId = await database('order').insert({
  //     room_id: req.body.roomId,
  //     user_id: req.body.userId,
  //   });
  //   console.log('orderId: ', orderId);
  //   await database('order_items').insert({
  //     order_id: orderId,
  //   });
  //   const postNewBill = await database('bill').insert({
  //     billing_object: req.body.billingObject,
  //     order_id: orderId,
  //     customer_id: req.body.customerId,
  //     staff_id: req.body.staffId,
  //     total_price: req.body.totalPrice,
  //     service_tip: req.body.serviceTip,
  //     point_earned: req.body.pointEarned,
  //     point_used: req.body.pointUsed,
  //     discount: req.body.discount,
  //     tax: req.body.tax,
  //     point: req.body.point,
  //     note: req.body.note,
  //     status: false,
  //   });
  //   console.log('billId', postNewBill);
  //   return res.status(200).json(postNewBill);
  // }
};
