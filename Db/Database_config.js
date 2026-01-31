import dotenv from 'dotenv';
import mysql from 'mysql2/promise'

dotenv.config();

const database=mysql.createPool({

    user:process.env.SQL_USER,

    host:process.env.SQL_HOST,

    password:process.env.SQL_PASSWORD,

    port :process.env.SQL_PORT,

    database:process.env.SQL_DB,

})

export default database;