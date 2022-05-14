import database from 'database';
import {NextApiRequest, NextApiResponse} from 'next/types';
import moment from 'moment';
// import {pid} from 'process';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: {pid},
    method,
  } = req;
  switch (method) {
    case 'GET':
      let queryBuilder = database('customers');
      if (!!pid) queryBuilder = queryBuilder.where('id', pid);
      const customer = await queryBuilder.select(
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
      res.status(200).json(customer);
      break;
  }
  switch (method) {
    case 'PATCH':
      let queryBuilder = database('customers');
      if (!!pid) queryBuilder = queryBuilder.where('id', pid);
      const updateUser = await queryBuilder.update({
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
      res.status(200).json(updateUser);
      break;
  }
};
