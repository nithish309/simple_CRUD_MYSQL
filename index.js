import db_conn from "./Db/Database_conn.js";
import express from 'express';
import dotenv from 'dotenv';

import userRoute from "./Routes/userRoute.js";

const app=express();
app.use(express.json());

dotenv.config();

const port=process.env.PORT;

app.use('/jobs',userRoute);


const startServer=async()=>{
    await db_conn();
    console.log(`Server is running on port ${port}`);
    app.listen(port);

}

startServer();