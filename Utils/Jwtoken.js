import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
    
const createToken =(email)=>{
    const token=jwt.sign(
        {
            expiresIn:process.env.JWT_EXPIRES_IN,
            email:email,
        },
        process.env.JWT_SECRET
    );
    return token;
}
export default createToken;