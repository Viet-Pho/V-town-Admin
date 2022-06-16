import jwtAuth from 'middleware/jwt';
import {calculateBillUsingRoom} from 'util/room';
import {changeHourWithTimeZone} from 'util/time';
import database from 'database';
import {NextApiRequest, NextApiResponse} from 'next/types';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb', // Set desired value here
    },
    responseLimit: '6mb',
  },
};

const handleOrderById = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: {orderId},
    body: {roomId, timeZone},
    method,
  } = req;

  if (!orderId) {
    return res.status(404).json({
      message: 'Not Found',
    });
  }
  if (method === 'POST') {
    try {
      const order = await database('order').where('id', orderId).first();

      if (!order)
        return res.status(500).json({
          message: 'Please reload your browser!',
        });
      if (+order.room_id !== +roomId) {
        return res.status(500).json({
          message: 'An error occurred while processing your request',
        });
      }

      const room = await database('rooms')
        .where('rooms.id', roomId)
        .join('room_type', 'rooms.room_type', '=', 'room_type.type')
        .first();

      const now = new Date();
      const created = changeHourWithTimeZone(new Date(order.created), timeZone);

      await database('order').where('id', orderId).update('end_time', now);

      const result = calculateBillUsingRoom(
        created,
        now,
        room.extra_time_charge,
        room.weekday_price,
        room.weekend_price,
        timeZone,
      );

      return res.status(200).send(result);
    } catch (e) {
      return res.status(500).json({message: `Error: ${e}`});
    }
  }
};
export default jwtAuth(handleOrderById);
