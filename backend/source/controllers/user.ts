import { NextFunction, Request, Response } from 'express';
import knex from '../config/knex';
import User from '../interfaces/user'

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await knex<User>('users').limit(1).offset(1).select();
    return res.status(200).send(users);
};

export default { getAllUsers };
