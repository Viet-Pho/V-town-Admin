// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import database from '../../database';
import {hash} from 'bcrypt';
import {NextApiResponse, NextApiRequest} from 'next';
import isEmail from 'isemail';
import {sign} from 'jsonwebtoken';
import {resolve} from 'path';
import {SECRET} from '../../util/CONSTANT';
import {nanoid} from 'nanoid';
import nodemailer from 'nodemailer';

export default async function signUp(
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
        const [insertedUserId] = await database('users').insert({
          email: req.body.email,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          age: req.body.age,
          phone_number: req.body.phone_number,
          address: req.body.address,
          username: req.body.username,
          password: hash,
          account_type: 3,
          confirmed: 0,
        });

        await database('customers').insert({
          user_id: insertedUserId,
          email: req.body.email,
          gender: 0,
          birthday: new Date(),
        });

        const user: any = await database('users')
          .where('email', req.body.email)
          .where('is_deleted', 0)
          .select();

        const claims = {
          id: user[0].id,
          email: user[0].email,
          role: user[0].account_type,
          username: user[0].username,
          confirmed: user[0].confirmed,
        };
        const jwt = sign(claims, SECRET, {
          expiresIn: '30 days',
        }); // auto-generate GUID for jwt;

        const securedTokenId = nanoid(32);
        await database('tokens_confirm').delete().where('userId', user[0].id);

        await database('tokens_confirm').insert({
          userId: user[0].id,
          type: 'verifyEmail',
          tokenId: securedTokenId,
          expireAt: new Date(Date.now() + 60 * 60 * 1000).getTime().toString(),
        });

        let smtpTransport = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'vtownmailservice@gmail.com',
            pass: 'rvpjelgutveldijy',
          },
        });

        let mailOptions = {
          from: 'vtownmailservice@gmail.com',
          to: user[0]?.email,
          subject: `Confirm your email - Vtown`,
          html: `
        <h2>Welcome to Vtown </h2>
          <ul>
            <li>Please verify your email to unlock awesome features</li>
            <li>Click <a href="${
              process.env.NODE_ENV !== 'development'
                ? `${process.env.APP_URL}/verify-email?token=${securedTokenId}`
                : `http://localhost:3000/verify-email?token=${securedTokenId}`
            }">here</a> to verify your account  </li>
          </ul>
        <h3>Yours sincerely</h3>
        <h1>Vtown Australia</h1>
    `,
        };

        smtpTransport.sendMail(mailOptions, (err, data) => {
          if (err) {
            console.log('Error in Sending Email Data :(', err);
          } else {
            console.log('Email sent successfully');
          }
        });

        return res.status(200).send({
          message: 'OK',
          error: false,
          token: jwt,
          user: {
            userId: user[0].id,
            username: user[0].username,
            email: user[0].email,
            role: user[0].account_type,
            confirmed: user[0].confirmed,
          },
        });
      } catch (error) {
        return res.status(400).send({error: true, message: `error: ${error}`});
      }
    });
  }
}
