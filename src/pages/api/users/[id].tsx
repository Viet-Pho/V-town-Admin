// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import database from '../../../database';

import {NextApiResponse, NextApiRequest} from 'next';
export default async function getOneUserById(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.statusCode = 200;

  const user = await database('users').where('id', req.query.id).select();

  console.log(user);
  return res.status(200).send(user);
}
