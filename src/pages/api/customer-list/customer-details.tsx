import database from '../../../database';
import {NextApiRequest, NextApiResponse} from 'next/types';
import moment from 'moment';

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
  const {method} = req;
  if (method === 'POST') {
    if (!req.body.firstName)
      return res.status(400).send({message: 'No blank first name'});

    if (!req.body.lastName)
      return res.status(400).send({message: 'No blank last name'});

    if (!req.body.address)
      return res.status(400).send({message: 'No blank address'});

    if (!req.body.birthday)
      return res.status(400).send({message: 'No blank birthday'});

    if (!req.body.phoneNumber)
      return res.status(400).send({message: 'No blank phone number'});

    if (!req.body.email)
      return res.status(400).send({message: 'No blank Email Address'});

    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const validEmail = regex.test(req.body.email);
    if (!validEmail)
      return res.status(400).send({message: 'Invalid Email Address'});

    if (!req.body.cardId)
      return res.status(400).send({message: 'No blank card id'});

    // if (!req.body.age) {
    //   return res.status(400).send({   message: 'No blank age'});
    // }
    if (!req.body.avatar)
      return res.status(400).send({message: 'No blank avatar'});

    try {
      await database('customers')
        .insert({
          card_id: req.body.cardId,
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          email: req.body.email,
          phone_number: req.body.phoneNumber,
          address: req.body.address,
          gender: req.body.gender,
          birthday: moment(req.body.birthday).format('YYYY-MM-DD'),
          avatar: req.body.avatar,
          age: req.body.age,
        })
        .then(
          await database('cards').insert({
            card_number: req.body.cardId,
          }),
        );
      res.status(200).json({message: 'Success'});
    } catch (error) {
      return res.status(400).send({message: `${error}`});
    }
  }
};
