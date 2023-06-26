import express from 'express';
import { getUser } from '../controllers/userController.js';

const userRouter = express.Router();
userRouter.route('/:id').get(getUser);

export default userRouter;
