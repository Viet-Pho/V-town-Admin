// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import database from '../../database';
import {hash} from 'bcrypt';
import {NextApiResponse, NextApiRequest} from 'next';
import nodemailer from 'nodemailer';
import isEmail from 'isemail';
import {nanoid} from 'nanoid';

export default async function ForgetPassword(
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
      //  https://hoangvvo.com/blog/next-js-and-mongodb-app-3
      const securedTokenId = nanoid(32);

      console.log('USer Email', user[0].email);

      try {
        await database('tokens_password').delete().where('userId', user[0].id);

        await database('tokens_password').insert({
          userId: user[0].id,
          type: 'passwordReset',
          tokenId: securedTokenId,
          expireAt: new Date(Date.now() + 20 * 60 * 1000).getTime().toString(),
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
          subject: `Password Reset - Vtown`,
          html: `
              <h2>Reset your password </h2>
                <ul>
                  <li>You have requested for a password reset</li>
                  <li>Click <a href="${
                    process.env.NODE_ENV !== 'development'
                      ? `${process.env.APP_URL}/reset-password?token=${securedTokenId}`
                      : `http://localhost:3000/reset-password?token=${securedTokenId}`
                  }">here</a> to go to password reset page:  </li>
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
        console.log(error);
        return res.status(400).send({error: true, message: `error: ${error}`});
      }
    }

    try {
    } catch (error: any) {
      console.log('Error Object', error.code);
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
