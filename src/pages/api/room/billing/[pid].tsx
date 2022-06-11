import jwtAuth from 'middleware/jwt';
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
const startBilling = async (req: NextApiRequest, res: NextApiResponse) => {
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
    console.log('req.body', req.body);
    console.log('req.query', req.query);
    try {
      const room = await database('rooms')
        .where('id', pid)
        .select('id', 'availability');
      console.log('availability', room);
      if (room[0].availability === 1) {
        await database('rooms').where('id', pid).update({
          availability: 0,
        });
        const order = await database('order').insert({
          room_id: pid,
          user_id: req.body.userId,
        });
        return res.status(200).json({order});
      } else {
        const order = await database('order')
          .where({room_id: pid, status: 0})
          .select(
            'id as orderId',
            'room_id as roomId',
            'user_id as userId',
            'status',
          );
        return res.status(200).json({order});
      }
    } catch (error) {
      return res.status(400).send({message: `${error}`});
    }
  }
};
export default jwtAuth(startBilling);
