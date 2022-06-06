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
  if (!pid) {
    return res.status(404).json({
      message: 'Not Found',
    });
  }
  if (method === 'GET') {
    try {
      const getRoomById = await database('rooms')
        .join('room_type', 'rooms.room_type', '=', 'room_type.type')
        .where('rooms.id', pid)
        .select(
          'rooms.id',
          'rooms.name',
          'rooms.room_type as roomType',
          'rooms.location',
          'rooms.wallpaper',
          'rooms.availability',
          'rooms.room_type as roomType',
          'room_type.type_name as typeName',
          'room_type.area_size as areaSize',
          'room_type.max_num_ppl as maxNumPpl',
          'room_type.weekday_price as weekdayPrice',
          'room_type.weekend_price as weekendPrice',
          'room_type.extra_time_charge as extraTimeCharge',
        );
      return res.status(200).json(getRoomById);
    } catch (e) {
      return res.status(400).json({message: `error: ${e}`});
    }
  }
  if (!req.body.name) {
    return res.status(400).json({message: 'missing name'});
  }
  if (!req.body.roomType) {
    return res.status(400).json({message: 'missing roomType'});
  }
  if (!req.body.location) {
    return res.status(400).json({message: 'missing location'});
  }

  if (method === 'PATCH') {
    try {
      const updateRoom = await database('rooms').where('id', pid).update({
        name: req.body.name,
        room_type: req.body.roomType,
        location: req.body.location,
        availability: req.body.availability,
        wallpaper: req.body.wallpaper,
      });
      return res.status(200).json(updateRoom);
    } catch (e) {
      return res.status(400).json({message: `error: ${e}`});
    }
  }
};
