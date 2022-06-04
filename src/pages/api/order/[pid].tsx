import database from '../../../database';
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
  console.log('req query', req.query);
  console.log('req body', req.body);
  if (!pid) {
    return res.status(404).json({
      message: 'Not Found',
    });
  }
  if (method === 'POST') {
    console.log('Item', req.body.itemId);
    try {
      await database('order_items').insert({
        order_id: pid,
        item_id: req.body.itemId,
        quantity: 1,
      });
      return res
        .status(200)
        .json({message: `Added ${req.body.itemId} to order ${pid}`});
    } catch (e) {
      return res.status(500).json({message: `Error: ${e}`});
    }
  }
  if (method === 'PATCH') {
    try {
      await database('order_items')
        .update({
          quantity: req.query.quantity,
          status: req.query.status,
        })
        .where({
          order_id: pid,
          item_id: req.query.itemId,
        });
      return res
        .status(200)
        .json({message: `Updated ${req.query.itemId} of order ${pid}`});
    } catch (e) {
      return res.status(500).json({message: `Error: ${e}`});
    }
  }
  if (method === 'DELETE') {
    try {
      await database('order_items').delete().where({
        order_id: pid,
        item_id: req.query.itemId,
      });
      return res
        .status(200)
        .json({message: `Deleted item ${req.query.itemId} of order ${pid}`});
    } catch (e) {
      return res.status(500).json({message: `Error: ${e}`});
    }
  }

  if (method === 'GET') {
    try {
      const getOrderedItems = await database('order')
        .join('order_items', 'order_items.order_id', '=', 'order.id')
        .select(
          'order_items.id as itemId',
          'order.room_id as roomId',
          'order_items.item_id as id',
          'order_items.quantity',
          'order_items.status',
          'order.id as orderId',
          'order.user_id as userId',
        )
        .where('order_items.order_id', pid)
        .where('order.room_id', req.query.roomId)
        .where('order_items.status', false);
      return res.status(200).json(getOrderedItems);
    } catch (e) {
      return res.status(500).json({message: `Error: ${e}`});
    }
  }
};
