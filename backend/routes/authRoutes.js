import express from 'express';
import { createNewUser, login } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.route('/login').post(login);

authRouter.route('/signup').post(createNewUser);

export default authRouter;
