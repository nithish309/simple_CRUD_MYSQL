import {createUserController, deleteUserController, editUserController, ExistsUserController} from "../Controller/userController.js";
import {getUserController} from "../Controller/userController.js";

import express from 'express';
import verifyToken from "../Middleware/verifyToken.js";

const router=express.Router();

router.post('/newuser',createUserController);

router.get('/getuser',verifyToken,getUserController);

router.put('/edituser/:id',verifyToken,editUserController);

router.delete('/deleteuser/:id',verifyToken,deleteUserController);

router.post('/loginuser',ExistsUserController);

export default router;