import jwtAuth from 'middleware/jwt';
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
const customerDetailHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const {
    query: {pid},
    method,
  } = req;

  if (method === 'DELETE') {
    try {
      const customer = await database('customers').where('id', pid).update({
        is_deleted: true,
      });
      const customerName = await database('customers')
        .where('id', customer)
        .select('first_name as firstName');
      return res.status(200).json({
        message: `Successfully deleted customer: ${customerName[0].firstName}`,
      });
    } catch (error) {
      return res.status(400).send({message: `${error}`});
    }
  }

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
    // if (!req.body.avatar)
    //   return res.status(400).send({message: 'No blank avatar'});

    try {
      let customer = database('customers');
      const existCard = await database('cards')
        .where('card_number', req.body.cardId)
        .select('card_number');

      if (existCard.length > 0) {
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
        return res.status(200).json(updateCustomer);
      } else {
        await customer.where('id', pid).update({
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
        await database('cards').insert({
          card_number: req.body.cardId,
        });
        return res.status(200).json({
          message: 'Update Customer Info and added new card for customer',
        });
      }
    } catch (error) {
      return res.status(400).send({message: `${error}`});
    }
  }
  if (method === 'GET') {
    try {
      if (!!pid) {
        const customer = database('customers')
          .join('users', 'customers.user_id', 'users.id')
          .select(
            'users.id as userId',
            'card_id as cardId',
            'users.first_name as firstName',
            'users.last_name as lastName',
            'phone_number as phoneNumber',
            'customers.email',
            'address',
            'gender',
            'birthday',
            'avatar',
            'age',
          )
          .where('id', pid);

        res.status(200).json(customer);
      }
    } catch (error) {
      return res.status(400).send({message: ` ${error}`});
    }
  }
};

export default jwtAuth(customerDetailHandler);
