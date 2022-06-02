import database from '../../../../database';
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
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: {pid},
    method,
  } = req;

  // if (method === 'DELETE') {
  //   try {
  //     const customer = await database('customers').where('id', pid).update({
  //       is_deleted: true,
  //     });
  //     const customerName = await database('customers')
  //       .where('id', customer)
  //       .select('first_name as firstName');
  //     return res.status(200).json({
  //       message: `Successfully deleted customer: ${customerName[0].firstName}`,
  //     });
  //   } catch (error) {
  //     console.log('error', error);
  //     return res.status(400).send({message: `${error}`});
  //   }
  // }
  if (!pid) return res.status(404).json({message: 'Not found'});

  if (method === 'PATCH') {
    if (!req.body) return res.status(400).send({message: 'Bad Request'});
    try {
      const updateItem = await database('items').where('id', pid).update({
        name: req.body.name,
        native_name: req.body.nativeName,
        wallpaper: req.body.wallpaper,
      });
      console.log('updateItem');
      res.status(200).json(updateItem);
    } catch (error) {
      return res.status(400).send({message: `${error}`});
    }
  }
  if (method === 'GET') {
    try {
      const getItem = await database('items').select('*').where('id', pid);
      res.status(200).json(getItem);
    } catch (error) {
      return res.status(400).send({message: ` ${error}`});
    }
  }
};
