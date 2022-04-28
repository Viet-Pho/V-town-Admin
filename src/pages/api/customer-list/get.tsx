import database from 'database';

export default async (req, res) => {
  const customers = await database('customers').offset(0).select();
  return res.status(200).send(customers);
};
