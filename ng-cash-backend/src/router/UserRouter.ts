import { UserController } from '../controller/UserController';
import { UserBusiness } from '../business/UserBusiness';
import { TokenManager } from '../services/TokenManager';
import { IdGenerator } from '../services/IdGenerator';
import { HashManager } from '../services/HashManager';
import { UserData } from '../data/UserData';
import express, { Router } from 'express';

const userBusiness: UserBusiness = new UserBusiness(
	new TokenManager(),
	new IdGenerator(),
	new HashManager(),
	new UserData()
);
const userController: UserController = new UserController(userBusiness);

export const userRouter: Router = express.Router();

// Routes

userRouter.post('/login', userController.login);
userRouter.post('/signup', userController.signup);

userRouter.get('/profile', userController.getProfile);
userRouter.get('/user/get-balance', userController.getBalance);

userRouter.put('/user/change-password', userController.changePassword);
userRouter.put('/user/change-username', userController.changeUsername);

userRouter.delete('/user/delete', userController.deleteUser);
