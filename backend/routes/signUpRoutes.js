import express from 'express';
import { createNewUser } from '../controllers/signUpController.js';

const signUpRouter = express.Router();

signUpRouter.route('/').post(createNewUser);

export default signUpRouter;
