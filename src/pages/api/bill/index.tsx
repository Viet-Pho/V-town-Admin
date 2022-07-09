import database from 'database';
import jwtAuth from 'middleware/jwt';
import {NextApiResponse} from 'next/types';

const billHandler = async (req, res: NextApiResponse) => {
  const {method} = req;

  const role = req.user?.role;
  if (!(role && [1, 2].includes(role)))
    return res
      .status(403)
      .json({message: "You don't have permission to do this action."});

  if (method === 'GET') {
    const {searchText = '', page = 1, limit = 20} = req.query;
    console.log(req.query);

    let queryBuilder = database('bill')
      .where('bill.is_deleted', false)
      .leftJoin('customers', 'customers.user_id', 'bill.customer_id')
      .leftJoin('users as staff', 'staff.id', 'bill.staff_id')
      .leftJoin('users as customer', 'customer.id', 'customers.user_id');

    if (!!searchText) {
      const likeStringSearchText = `%${searchText}%`;
      queryBuilder = queryBuilder
        .whereLike('note', likeStringSearchText)
        .orWhereLike('customer.last_name', likeStringSearchText)
        .orWhereLike('customer.first_name', likeStringSearchText)
        .orWhereLike('staff.last_name', likeStringSearchText)
        .orWhereLike('staff.first_name', likeStringSearchText);
    }

    await database.raw('SET sql_mode = "";');
    const {total} =
      (await queryBuilder.clone().count('bill.id as total').first()) || {};

    const bills = await queryBuilder
      .offset((page - 1) * limit)
      .limit(limit)
      .select(
        'bill.id',
        'billing_object as billingObject',
        'order_id as orderId',
        'customer_id as customerId',
        'staff_id as staffId',
        'total_price as totalPrice',
        'service_tip as serviceTip',
        'discount',
        'tax',
        'point_earned as pointEarned',
        'point_used as pointUsed',
        'note',
        'status',
        database.raw(
          `CONCAT(staff.first_name, ' ', staff.last_name) as "staffName"`,
        ),
        database.raw(
          `CONCAT(customer.first_name, ' ', customer.last_name) as "customerName"`,
        ),
      );

    return res.status(200).json({total, bills});
  } else if (method === 'POST') {
    const {orderId, customerId, tax, tip, totalPrice, roomId, discountPoint} =
      req.body;

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
