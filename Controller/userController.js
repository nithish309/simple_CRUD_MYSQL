import  UserModel  from "../Model/userModel.js";
import hashpassword from "../Utils/Hashpass.js";

export const createUserController= async(req,res)=>{

    const {name,email,password}=req.body;
    try{
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
