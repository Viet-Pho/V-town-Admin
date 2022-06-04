import jwtAuth from 'middleware/jwt';
import database from '../../../database';

const cardHandler = async (req, res) => {
  const {method} = req;
  if (method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
  const {cardId} = req.query;
  const card = await database('cards').where('card_number', cardId).first();
  if (!card)
    return res.status(404).send({message: `Card ${cardId} not found.`});
  if (card.is_deleted)
    return res
      .status(400)
      .send({message: `Card ${cardId} has already been disabled.`});

  await database('cards')
    .where('card_number', cardId)
    .update({is_deleted: true, editor_id: req?.user?.id});

  return res.status(200).send({message: `Disable card ${cardId} successful.`});
};

export default jwtAuth(cardHandler);
