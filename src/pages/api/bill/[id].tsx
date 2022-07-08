import database from 'database';
import jwtAuth from 'middleware/jwt';
import {NextApiResponse} from 'next/types';

const billHandler = async (req, res: NextApiResponse) => {
  const {method} = req;
  const {id} = req.query;

  if (!id) return res.status(422).json({message: "Missing 'id' parameter"});

  const role = req.user?.role;
  if (!(role && [1, 2].includes(role)))
    return res
      .status(403)
      .json({message: "You don't have permission to do this action."});

  const bill = await database('bill').where('id', id).first();
  if (bill.is_deleted)
    return res.status(400).json({message: 'This bill has been deleted before'});

  if (method === 'GET') {
    const billList = await database('bill')
      .leftJoin('customers', 'customers.user_id', 'bill.customer_id')
      .leftJoin('users as staff', 'staff.id', 'bill.staff_id')
      .leftJoin('users as customer', 'customer.id', 'customers.user_id')
      .where('bill.id', id)
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
    return res.status(200).json(billList);
  } else if (method === 'PUT') {
    const form = {...req.body};

    await database('bill').where('id', id).update(form);

    return res.status(200).send({message: 'Update bill successful.'});
  } else if (method === 'DELETE') {
    await database('bill').where('id', id).update('is_deleted', 1);
    return res.status(200).send({message: 'Delete bill successful.'});
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).end(`Method ${method} Not Allowed`);
};

export default jwtAuth(billHandler);
