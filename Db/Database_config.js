import dotenv from 'dotenv';
import mysql from 'mysql2/promise'

dotenv.config();

const database=mysql.createPool({

     host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB,
  port: process.env.SQL_PORT,

})

export default database;