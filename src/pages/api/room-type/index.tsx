import jwtAuth from 'middleware/jwt';
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

const menuHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {method} = req;

  if (method === 'GET') {
    const roomTypes = await database('room_type').select(
      'id',
      'type',
      'type_name as name',
    );

    return res.status(200).send(roomTypes);
  }
};
export default jwtAuth(menuHandler);
