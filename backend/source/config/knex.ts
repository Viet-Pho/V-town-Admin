import { Knex, knex } from 'knex'
import config from './config';

const connection = {
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.pass,
    database: config.mysql.database
}

const knexConfig: Knex.Config = {
    client: 'mysql',
    connection,
  };

const knexQueryBuilder = knex(knexConfig)
  
export default knexQueryBuilder
