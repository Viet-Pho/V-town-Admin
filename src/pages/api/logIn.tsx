// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import database from '../../database';
import {compare} from 'bcrypt';
import {NextApiResponse, NextApiRequest} from 'next';
import {sign} from 'jsonwebtoken';
import {resolve} from 'path';
import {SECRET} from '../../util/CONSTANT';
export default async function logIn(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send({message: 'Forbidden resources'});
  }

  if (req.method === 'POST') {
    try {
      if (req.body.email === null) {
        res
          .status(400)
          .send({error: true, message: 'Email should not be null'});
        return resolve();
      }

      if (req.body.password === null) {
        res
          .status(400)
          .send({error: true, message: 'Password should not be null'});
        return resolve();
      }

      if (req.body.password !== null && req.body.email !== null) {
        const user: any = await database('users')
          .where('email', req.body.email)
          .where('is_deleted', 0)
          .select();

        compare(req.body.password, user[0]?.password, function (err, result) {
          if (!err && result) {
            const claims = {sub: user[0].id, userEmail: user[0].email};
            const jwt = sign(claims, SECRET, {
              expiresIn: '365 days',
            }); // auto-generate GUID for jwt;
            return res.status(200).send({
              message: 'Ok',
              error: false,
              token: jwt,
              user: {
                userId: user[0].id,
                username: user[0].username,
                email: user[0].email,
              },
            });
          } else {
            res.status(400).send({error: true, message: 'Invalid credentials'});
            return resolve();
          }
        });
      }
    } catch (error) {
      res.status(400).send({error: true, message: `error: ${error}`});

      return resolve();
    }
  }
}
