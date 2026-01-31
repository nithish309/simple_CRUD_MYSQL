import database from "./Database_config.js";

const db_conn=async()=>{

    try{
        const connection=await database.getConnection();
        console.log('Database connected successfully');
        connection.release();

    }catch(error){
        console.error('Database connection failed:', error);
    }

}

export default db_conn;