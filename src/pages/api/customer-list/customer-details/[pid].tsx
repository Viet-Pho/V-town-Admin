import database from 'database';
import {NextApiRequest, NextApiResponse} from 'next/types';
// import {pid} from 'process';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const pid = req.query.pid;
  const respond = await database('customers').where('id', pid).select();
  return res.status(200).send(respond);
};
