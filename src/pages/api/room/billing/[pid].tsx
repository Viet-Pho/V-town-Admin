import jwtAuth from 'middleware/jwt';
import database from 'database';
import {userRole} from 'constants/user';
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb', // Set desired value here
    },
    responseLimit: '6mb',
  },
};
const startBilling = async (req: any, res: any) => {
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
    try {
      const room = await database('rooms')
        .where('id', pid)
        .select('id', 'availability')
        .first();
      // const order = await database('order')
      //   .where({
      //     room_id: pid,
      //   })
      //   .whereNot({
      //     status: 0,
      //   })
      //   .select(
      //     'id as orderId',
      //     'room_id as roomId',
      //     'user_id as userId',
      //     'status',
      //   );
      if (room && room.availability === 1) {
        await database('rooms').where('id', pid).update({
          availability: 0,
        });
        const order = await database('order').insert({
          room_id: pid,
          roomName: room.name,
          user_id: req.user?.role === userRole.customer ? req.user?.id : null,
          created: new Date(),
        });
        return res.status(200).json({order});
      } else {
        const order = await database('order')
          .where({room_id: pid, status: 0})
          .join('rooms', 'rooms.id', '=', 'order.room_id')
          .select(
            'order.id as orderId',
            'order.room_id as roomId',
            'rooms.name as roomName',
            'order.user_id as userId',
            'order.status',
          )
          .first();
        return res.status(200).json({order});
      }
    } catch (error) {
      return res.status(400).send({message: `${error}`});
    }
  }
};
export default jwtAuth(startBilling);
