import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:'Authorization header missing'});
    }
    if(!authHeader.startsWith('Bearer ')){
        return res.status(401).json({message:'Invalid authorization header format'});
    }

    const token=authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'Token missing'});
    }
    try{
        const decodeToken=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decodeToken;
        next();
    }catch(error){
        console.error('Token verification failed:',error);
        return res.status(401).json({message:'Invalid or expired token'});
    }
}
export default verifyToken;