import jwtAuth from 'middleware/jwt';
import database from '../../../../database';
import {NextApiRequest, NextApiResponse} from 'next/types';
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb', // Set desired value here
    },
    responseLimit: '6mb',
  },
};
const handleTablesById = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: {pid},
    method,
  } = req;
  console.log('pid: ', pid);
  if (!pid) {
    return res.status(404).json({
      message: 'Not Found',
    });
  }

  // Get Tables based on Location id
  if (method === 'GET') {
    try {
      const tables = await database('tables').where('location', pid).select();
      const locationName = await database('tables_location')
        .where('id', pid)
        .select();
      return res
        .status(200)
        .send({error: false, tables: tables, locationName: locationName});
    } catch (error) {
      return res.status(400).send({error: true, message: `error: ${error}`});
    }
  }

  // Create a new table based on Location Id
  // params body: name, position_x, position_y, availability default 1
  if (method === 'POST') {
    if (req.body.name === null) {
      return res.status(400).send({
        error: true,
        message: ' Table name should not be null',
      });
    }
    if (req.body.position_x === null) {
      return res.status(400).send({
        error: true,
        message: 'Table position_x should not be null',
      });
    }
    if (req.body.position_y === null) {
      return res.status(400).send({
        error: true,
        message: 'Table position_y should not be null',
      });
    }

    try {
      const insertTable = await database('tables').insert({
        name: req.body.name,
        location: pid,
        availability: 1,
        position_x: req.body.position_x,
        position_y: req.body.position_y,
      });
      return res
        .status(200)
        .send({error: false, message: 'ok', table: insertTable});
    } catch (error) {
      return res.status(400).send({error: true, message: `error: ${error}`});
    }
  }

  // Update Table
  // params body: availability, table id, position_x, position_x, table name
  if (method === 'PATCH') {
    if (req.body.name === null) {
      return res.status(400).send({
        error: true,
        message: ' Table name should not be null',
      });
    }
    if (req.body.position_x === null) {
      return res.status(400).send({
        error: true,
        message: 'Table position_x should not be null',
      });
    }
    if (req.body.position_y === null) {
      return res.status(400).send({
        error: true,
        message: 'Table position_y should not be null',
      });
    }
    if (req.body.availability === null) {
      return res.status(400).send({
        error: true,
        message: 'availability should not be null',
      });
    }
    if (req.body.id === null) {
      return res.status(400).send({
        error: true,
        message: 'Table id should not be null',
      });
    }
    try {
      const updateTable = await database('tables')
        .where('id', req.body.id)
        .where('location', pid)
        .update({
          name: req.body.name,
          location: pid,
          availability: req.body.availability,
          position_x: req.body.position_x,
          position_y: req.body.position_y,
        });
      return res
        .status(200)
        .send({error: false, message: 'ok', table: updateTable});
    } catch (error) {
      return res.status(400).json({error: true, message: `error: ${error}`});
    }
  }
  // Delete Table
  // params body: {id: string}
  if (method === 'DELETE') {
    if (req.body.id === null) {
      return res.status(400).send({
        error: true,
        message: ' Table id should not be null when delete',
      });
    }
    if (req.body.id) {
      console.log('Re body id delete', req.body.id);
      try {
        const deleteTable = await database('tables')
          .delete()
          .where('id', req.body.id);

        return res
          .status(200)
          .send({error: false, message: 'ok', deleted: deleteTable});
      } catch (error) {
        return res.status(400).json({error: true, message: `error: ${error}`});
      }
    }
  }

  // Delete Table
  // params body: {id: string}
  if (method === 'DELETE') {
    if (req.body.id === null) {
      return res.status(400).send({
        error: true,
        message: ' Table id should not be null when delete',
      });
    }
    if (req.body.id) {
      console.log('Re body id delete', req.body.id);
      try {
        const deleteTable = await database('tables')
          .delete()
          .where('id', req.body.id);

        return res
          .status(200)
          .send({error: false, message: 'ok', deleted: deleteTable});
      } catch (error) {
        return res.status(400).json({error: true, message: `error: ${error}`});
      }
    }
  }

  // Clear All Tables
  // no params
  if (method === 'PUT') {
    try {
      const clearAll = await database('tables').delete().where('location', pid);

      return res
        .status(200)
        .send({error: false, message: 'ok', deleted: clearAll});
    } catch (error) {
      return res.status(400).json({error: true, message: `error: ${error}`});
    }
  }
};
export default jwtAuth(handleTablesById);
