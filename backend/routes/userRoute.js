import express from 'express';
import { registerUser, getLatestUser, getAllUsers,deleteUser,updateUser} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.get('/latest', getLatestUser); // 👈 Add this route
userRouter.get('/all', getAllUsers); // 👈 NEW
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id", updateUser);


export default userRouter;