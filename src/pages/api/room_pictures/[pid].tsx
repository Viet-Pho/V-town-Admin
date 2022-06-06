import database from 'database';
import {NextApiRequest, NextApiResponse} from 'next/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: {pid},
    method,
  } = req;
  if (method === 'GET') {
    let room_pictures = database('room_pictures');
    const getRoom = await room_pictures.where('id', pid).select('*');
    return res.status(200).json(getRoom);
  }
};
