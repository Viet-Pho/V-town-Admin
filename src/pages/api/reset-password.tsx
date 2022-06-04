// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import database from '../../database';
import {hash} from 'bcrypt';
import {NextApiResponse, NextApiRequest} from 'next';
import nodemailer from 'nodemailer';
import isEmail from 'isemail';
import {nanoid} from 'nanoid';

export default async function ResetPassword(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(404).send({message: 'Forbidden resources'});
  }

  if (req.method === 'POST') {
    // check for null token
    if (req.body.token === null) {
      return res.status(400).send({error: true, message: 'Invalid Token'});
    }

    // check for null password
    if (req.body.password === null) {
      return res
        .status(400)
        .send({error: true, message: 'Password should not be null'});
    }

    // Check if  token expired or not

    const currentTimeStamp = new Date(Date.now()).getTime().toString();
    const tokenData = await database('tokens_password')
      .where('tokenId', req.body.token)
      .where('type', 'passwordReset')
      .select();

    if (tokenData.length === 0) {
      return res.status(400).send({error: true, message: 'Token expired'});
    }

    if (tokenData.length > 0) {
      if (currentTimeStamp > tokenData[0].expireAt) {
        await database('tokens_password')
          .delete()
          .where('tokenId', req.body.token);
        return res.status(400).send({error: true, message: 'Token expired'});
      }

      if (currentTimeStamp < tokenData[0].expireAt) {
        //  Token is valid if able to reach here

        // Update user Password and  delete token
        hash(req.body.password, 12, async function (err, hash) {
          try {
            await database('users')
              .update({password: hash})
              .where('id', tokenData[0].userId);

            await database('tokens_password')
              .delete()
              .where('tokenId', req.body.token);

            res.status(200).send({error: false, message: 'OK'});
          } catch (error) {
            return res
              .status(400)
              .send({error: true, message: `Error: ${error}`});
          }
        });
      }
    }
  }
}
