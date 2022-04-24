import dotenv from 'dotenv';

dotenv.config();

const MYSQL_HOST = process.env.MYSQL_HOST || '';
const MYSQL_PORT = 3306;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || '';
const MYSQL_USER = process.env.MYSQL_HOST || '';
const MYSQL_PASS = process.env.MYSQL_HOST || '';

const MYSQL = {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    pass: MYSQL_PASS
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 5000;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    mysql: MYSQL,
    server: SERVER
};

export default config;
