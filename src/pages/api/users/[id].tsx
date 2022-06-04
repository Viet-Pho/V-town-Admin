import jwtAuth from 'middleware/jwt';
import database from '../../../database';

import {NextApiResponse, NextApiRequest} from 'next';
const getOneUserById = async (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;

  const user = await database('users').where('id', req.query.id).select();

  return res.status(200).send(user);
};

export default jwtAuth(getOneUserById);
