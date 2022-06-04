// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import database from '../../database';
import {hash} from 'bcrypt';
import {NextApiResponse, NextApiRequest} from 'next';
import nodemailer from 'nodemailer';
import isEmail from 'isemail';
import {nanoid} from 'nanoid';

export default async function sendVerifyEmail(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(404).send({message: 'Forbidden resources'});
  }

  if (req.method === 'POST') {
    // check for null
    if (req.body.email === null) {
      return res
        .status(400)
        .send({error: true, message: 'Email should not be null'});
    }

    // check for invalid email
    if (!isEmail.validate(`${req.body.email}`)) {
      return res
        .status(400)
        .send({error: true, message: `Invalid Email Address`});
    }

    const user = await database('users')
      .where('email', req.body.email)
      .where('is_deleted', 0)
      .select();

    if (user.length < 0) {
      return res
        .status(400)
        .send({error: true, message: 'Account does not existed'});
    }

    if (user.length > 0) {
      const securedTokenId = nanoid(32);

      try {
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
            pass: 'ABC123456!',
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

        return res.status(200).send({error: false, message: 'ok'});
      } catch (error) {
        return res.status(400).send({error: true, message: `error: ${error}`});
      }
    }

    try {
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).send({
          error: true,
          message: `A token has been sent to this email account`,
        });
      } else {
        return res.status(400).send({error: true, message: `error: ${error}`});
      }
    }
  }
}
