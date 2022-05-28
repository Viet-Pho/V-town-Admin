import jwtAuth from 'middleware/jwt';

const auth = (req, res) => {
  const {method} = req;
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  return res.status(200).send(req.user);
};

export default jwtAuth(auth);
