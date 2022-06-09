import jwtAuth from 'middleware/jwt';
import database from '../../../database';
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

const customerDetail = async (req: NextApiRequest, res: NextApiResponse) => {
  const {method} = req;
  if (!req.body) {
    return res.status(400).send({error: true, message: 'Data is blank'});
  }
  if (method === 'POST') {
    if (!isEmail.validate(`${req.body.email}`)) {
      return res
        .status(400)
        .send({error: true, message: 'Invalid Email Address'});
    }
    if (!req.body.firstName) {
      return res
        .status(400)
        .send({error: true, message: 'No blank first name'});
    }
    if (!req.body.lastName) {
      return res.status(400).send({error: true, message: 'No blank last name'});
    }
    if (!req.body.phoneNumber) {
      return res
        .status(400)
        .send({error: true, message: 'No blank phone number'});
    }
    if (!req.body.address) {
      return res.status(400).send({error: true, message: 'No blank address'});
    }
    if (!req.body.birthday) {
      return res.status(400).send({error: true, message: 'No blank birthday'});
    }
    if (!req.body.cardId) {
      return res.status(400).send({error: true, message: 'No blank card id'});
    }
    // if (!req.body.age) {
    //   return res.status(400).send({error: true, message: 'No blank age'});
    // }
    try {
      let customer = database('customers');
      const addCustomer = await customer.insert({
        card_id: req.body.cardId,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        phone_number: req.body.phoneNumber,
        address: req.body.address,
        age: req.body.age,
        gender: req.body.gender,
        avatar: req.body.avatar,
        is_deleted: false,
        birthday: moment(req.body.birthday).format('YYYY-MM-DD'),
      });
      await database('cards').insert({
        card_number: req.body.cardId,
      });
      res.status(200).json(addCustomer);
    } catch (error) {
      return res
        .status(400)
        .send({error: true, message: `Cannot Add Customer`});
    }
  }
};

export default jwtAuth(customerDetail);
