import jwtAuth from 'middleware/jwt';
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
const roomHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {method} = req;
  if (method === 'GET') {
    const roomList = await database('rooms')
      .join('room_type', 'rooms.room_type', '=', 'room_type.type')
      .select(
        'rooms.id',
        'rooms.name',
        'rooms.room_type as roomType',
        'rooms.location',
        // 'rooms.wallpaper',
        'rooms.availability',
        'rooms.room_type as roomType',
        'room_type.type_name as typeName',
        'room_type.area_size as areaSize',
        'room_type.max_num_ppl as maxNumPpl',
        'room_type.weekday_price as weekdayPrice',
        'room_type.weekend_price as weekendPrice',
        'room_type.extra_time_charge as extraTimeCharge',
      );
    return res.status(200).json(roomList);
  }
  if (method === 'POST') {
    let room = database('rooms');
    const postRoom = await room.insert({
      name: req.body.name,
      room_type: req.body.roomType,
      max_size: req.body.maxSize,
      weekday_price: req.body.weekdayPrice,
      weekend_price: req.body.weekendPrice,
      location: req.body.location,
      availability: true,
      wallpaper: req.body.wallpaper,
    });
    return res.status(200).json(postRoom);
  }
};
export default jwtAuth(roomHandler);