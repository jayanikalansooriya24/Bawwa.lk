import express from 'express';
import { registerUser, getLatestUser, } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.get('/latest', getLatestUser); // 👈 Add this route


export default userRouter;