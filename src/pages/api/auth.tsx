import jwtAuth from 'middleware/jwt';
import database from '../../database';

const auth = async (req, res) => {
  const {method} = req;
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
  const {id: userId} = req.user;
  const [user] = await database('users')
    .where('id', userId)
    .where('is_deleted', 0)
    .select('username', 'account_type as role', 'id', 'email', 'confirmed');
  
  if (!user) return res.status(404).end(`User ${userId} not found`);

  return res.status(200).send(user);
};

export default jwtAuth(auth);
