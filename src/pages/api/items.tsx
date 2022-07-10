import jwtAuth from 'middleware/jwt';
import database from '../../database';
import {NextApiRequest, NextApiResponse} from 'next/types';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb',
    },
    responseLimit: '6mb',
  },
};

const itemsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {method} = req;

  if (method === 'POST') {
    try {
      const addNewItem = await database('items').insert({
        name: req.body.name,
        native_name: req.body.nativeName,
        price: req.body.price,
        type: req.body.type,
        quantitive: req.body.quantitive,
        tag: req.body.tag,
        wallpaper: req.body.wallpaper,
      });
      res.status(200).json(addNewItem);
    } catch (error) {
      return res.status(400).send({error: true, message: `Cannot Add Item`});
    }
  }
  if (method === 'GET') {
    try {
      const getItem = await database('items').select(
        'id',
        'name',
        'native_name as nativeName',
        'price',
        'type',
        'quantitive',
        'tag',
        'wallpaper',
      );
      res.status(200).json(getItem);
    } catch (error) {
      return res.status(400).send({error: true, message: ` ${error}`});
    }
  }
};
export default jwtAuth(itemsHandler);
