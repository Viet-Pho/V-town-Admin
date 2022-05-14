// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import database from '../../database';
import {hash} from 'bcrypt';
import {NextApiResponse, NextApiRequest} from 'next';
import isEmail from 'isemail';

export default async function registerStaff(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(404).send({message: 'Forbidden resources'});
  }

  if (req.method === 'POST') {
    hash(req.body.password, 12, async function (err, hash) {
      // Store hash in your password DB.

      if (!isEmail.validate(`${req.body.email}`)) {
        return res.status(400).send({message: `Invalid Email Address`});
      }

      const checkDuplicateEmail = await database('users')
        .where('email', req.body.email)
        .select();

      const checkDuplicateUsername = await database('users')
        .where('username', req.body.username)
        .select();

      if (checkDuplicateEmail.length > 0) {
        return res.status(400).send({message: 'Email already existed'});
      }
      if (checkDuplicateUsername.length > 0) {
        return res.status(400).send({message: 'Username already existed'});
      }

      if (req.body.email === null) {
        res
          .status(400)
          .send({error: true, message: 'Email should not be null'});
      }

      if (req.body.password === null) {
        res
          .status(400)
          .send({error: true, message: 'Password should not be null'});
      }
      if (req.body.username === null) {
        res
          .status(400)
          .send({error: true, message: 'Username should not be null'});
      }

      try {
        const insertUser = await database('users').insert({
          email: req.body.email,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          age: req.body.age,
          phone_number: req.body.phone_number,
          address: req.body.address,
          username: req.body.username,
          password: hash,
          account_type: 2, // 2 -for-staff
        });

        return res.status(200).send({
          message: 'OK',
          staff: {
            userId: insertUser[0],
            email: req.body.email,
            username: req.body.username,
          },
        });
      } catch (error) {
        return res.status(400).send({error: true, message: `error: ${error}`});
      }
    });
  }
}
