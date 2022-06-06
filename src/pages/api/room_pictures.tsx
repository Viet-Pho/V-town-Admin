import database from '../../database';
import {NextApiRequest, NextApiResponse} from 'next/types';
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Set desired value here
    },
    responseLimit: '10mb',
  },
};
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {method} = req;
  if (method === 'GET') {
    let room_pictures = database('room_pictures');
    const getRoom = await room_pictures
      .where('is_deleted', 0)
      .select(
        'picture_id as pictureId',
        'room_id as roomId',
        'room_name as roomName',
        'room_picture as roomPicture',
      );
    return res.status(200).json(getRoom);
  }
  if (method === 'POST') {
    const newRoom = await database('room_pictures').insert({
      room_id: req.body.roomId,
      room_name: req.body.roomName,
      room_pictures: req.body.roomPictures,
      is_deleted: false,
    });
    return res.status(200).json(newRoom);
  }
};
