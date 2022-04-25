import { Knex, knex } from 'knex'
import CONFIG from './shared/constants/Database';

const connection = {
  host: CONFIG.MYSQL_HOST,
  port: CONFIG.MYSQL_PORT,
  user: CONFIG.MYSQL_USER,
  password: CONFIG.MYSQL_PASS,
  database: CONFIG.MYSQL_DATABASE
}

const knexConfig: Knex.Config = {
  client: 'mysql',
  connection,
};

const knexQueryBuilder = knex(knexConfig)
  
export default knexQueryBuilder
