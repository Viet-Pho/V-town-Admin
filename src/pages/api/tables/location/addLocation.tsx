// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import database from '../../../../database';

import {NextApiResponse, NextApiRequest} from 'next';
import jwtAuth from 'middleware/jwt';

async function addLocation(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(404).send({message: 'Forbidden resources'});
  }

  if (req.method === 'POST') {
    if (req.body.location === null) {
      return res
        .status(400)
        .send({error: true, message: 'Location string should not be null!'});
    }

    if (req.body.location) {
      try {
        await database('tables_location').insert({
          location: req.body.location,
        });
        return res.status(200).send({error: false, message: 'ok'});
      } catch (error) {
        return res.status(400).send({error: true, message: `error: ${error}`});
      }
    }
  }
}

export default jwtAuth(addLocation);
