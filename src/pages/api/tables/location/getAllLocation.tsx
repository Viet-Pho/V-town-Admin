// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import database from '../../../../database';

import {NextApiResponse, NextApiRequest} from 'next';
import jwtAuth from 'middleware/jwt';

async function getALlLocation(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(404).send({message: 'Forbidden resources'});
  }

  if (req.method === 'GET') {
    const locations: any = await database('tables_location').select();

    return res.status(200).send({
      locations: locations,
    });
  }
}

export default jwtAuth(getALlLocation);
