import bcrypt from "bcryptjs";
import  UserModel  from "../Model/userModel.js";
import hashpassword from "../Utils/Hashpass.js";

import createToken from "../Utils/Jwtoken.js";

export const createUserController= async(req,res)=>{

    const {name,email,password}=req.body;
    try{
        const userExists=await UserModel.existUser({email});
        if(userExists){
            return  res.status(400).json({message:'User with this email already exists'});
        }
        const hashedPassword=await hashpassword(password);
        const result=await UserModel.createUser({name,email,hashedPassword});
        res.status(201).json({message:'User created successfully',userId:result.insertId});
    }catch(error){
        console.error('Error creating user:',error);
        res.status(500).json({message:'Internal server error'});
    }
}

export const getUserController=async(req,res)=>{
    try{
        const users=await UserModel.getUser();
        res.status(200).json(users);
    }catch(error){
        console.error('Error fetching users:',error);
        res.status(500).json({message:'Internal server error'});
    }    
}

    export const editUserController=async(req,res)=>{
        try{

            const {id}=req.params;
            const {name,email,password}=req.body;
            const hashedPassword=await hashpassword(password);
            const result=await UserModel.editUser({name,email,hashedPassword,id});
            res.status(200).json({message:'User updated successfully',affectedrows:result.affectedRows});
        }
        catch(error){
            console.error('Error updating user:',error);
            res.status(500).json({message:'Internal server error'});

        }
    
}
export const deleteUserController=async(req,res)=>{
    try{
        const {id}=req.params;
        const result=await UserModel.deleteUser(id);
        res.status(200).json({message:'User deleted successfully',affectedrows:result.affectedRows});
    }catch(error){
        console.error('Error deleting user:',error);
        res.status(500).json({message:'Internal server error'});
    }
}

export const ExistsUserController=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await UserModel.existUser({email});
        if(user){
            const passwordMatch=await bcrypt.compare(password,user.password);
            if(passwordMatch){
                const token=createToken(user.email);
                res.status(200).json({"message":"login successful","exists":true,"token":token});
            }else{
                return res.status(401).json({"message":"password incorrect","exists":false});
            }
        }else{
            return res.status(404).json({"message":"invalid user"});
        }
    }catch(error){
        console.error('Error login:',error);
        res.status(500).json({message:'Internal server error'});
    }
}
