import jwtAuth from 'middleware/jwt';
import database from 'database';

const customerListHandler = async (req, res) => {
  const customers = await database('customers').offset(0).select();
  return res.status(200).send(customers);
};

export default jwtAuth(customerListHandler);
