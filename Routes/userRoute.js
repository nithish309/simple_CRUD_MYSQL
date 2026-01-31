import {createUserController, deleteUserController, editUserController} from "../Controller/userController.js";
import {getUserController} from "../Controller/userController.js";

import express from 'express';

const router=express.Router();

router.post('/newuser',createUserController);

router.get('/getuser',getUserController);

router.put('/edituser/:id',editUserController);

router.delete('/deleteuser/:id',deleteUserController);

export default router;