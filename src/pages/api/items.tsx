import jwtAuth from 'middleware/jwt';
import database from '../../database';
import {NextApiRequest, NextApiResponse} from 'next/types';
import moment from 'moment';
import isEmail from 'isemail';
// import {pid} from 'process';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb', // Set desired value here
    },
    responseLimit: '6mb',
  },
};

const itemsHandler = async  (req: NextApiRequest, res: NextApiResponse) => {
  const {method} = req;

  if (method === 'POST') {
    try {
      const addNewItem = await database('items').insert({});
      res.status(200).json(addNewItem);
    } catch (error) {
      return res.status(400).send({error: true, message: `Cannot Add Item`});
    }
  }
  if (method === 'GET') {
    try {
      const getItem = await database('items').select('*');
      res.status(200).json(getItem);
    } catch (error) {
      return res.status(400).send({error: true, message: ` ${error}`});
    }
  }
};
export default jwtAuth(itemsHandler);