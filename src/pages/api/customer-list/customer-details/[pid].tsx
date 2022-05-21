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
  if (!pid) return res.status(404).json({message: 'Not found'});

  if (method === 'PATCH') {
    if (!req.body) return res.status(400).send({message: 'Bad Request'});
    if (!req.body.firstName)
      return res.status(400).send({message: 'No blank first name'});

    if (!req.body.lastName)
      return res.status(400).send({message: 'No blank last name'});

    if (!req.body.birthday)
      return res.status(400).send({message: 'No blank birthday'});

    if (!req.body.phoneNumber)
      return res.status(400).send({message: 'No blank phone number'});

    if (!isEmail.validate(`${req.body.email}`))
      return res.status(400).send({message: 'Invalid Email Address'});

    if (!req.body.address)
      return res.status(400).send({message: 'No blank address'});

    if (!req.body.cardId)
      return res.status(400).send({message: 'No blank card id'});

    // if (!req.body.age) {
    //   return res.status(400).send({  message: 'No blank age'});
    // }
    if (!req.body.avatar)
      return res.status(400).send({message: 'No blank avatar'});

    try {
      let customer = database('customers');
      const updateCustomer = await customer.where('id', pid).update({
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
      });
      res.status(200).json(updateCustomer);
    } catch (error) {
      return res.status(400).send({message: `${error}`});
    }
  }
  if (method === 'GET') {
    try {
      let customer = database('customers');
      if (!!pid) customer = customer.where('id', pid);
      const getCustomer = await customer.select(
        'id',
        'card_id as cardId',
        'first_name as firstName',
        'last_name as lastName',
        'phone_number as phoneNumber',
        'email',
        'address',
        'gender',
        'birthday',
        'avatar',
        'age',
      );
      res.status(200).json(getCustomer);
    } catch (error) {
      return res.status(400).send({message: ` ${error}`});
    }
  }
};
