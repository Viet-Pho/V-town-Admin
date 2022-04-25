// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import database from '../../../../database'

export default async (req, res) => {
    res.statusCode = 200;
    console.log(66666, req.query, req.method)
    const users = await database('users').limit(2).offset(0).select();
    return res.status(200).send(users);
}
  