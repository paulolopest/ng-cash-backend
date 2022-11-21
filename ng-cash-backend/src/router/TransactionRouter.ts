import { TransactionController } from '../controller/TransactionController';
import { TransactionBusiness } from '../business/TransactionBusiness';
import { TransactionData } from '../data/TransactionData';
import { TokenManager } from '../services/TokenManager';
import { IdGenerator } from '../services/IdGenerator';
import { UserData } from '../data/UserData';
import express, { Router } from 'express';

const transactionBusiness: TransactionBusiness = new TransactionBusiness(
	new TransactionData(),
	new TokenManager(),
	new IdGenerator(),
	new UserData()
);

const transactionController: TransactionController = new TransactionController(
	transactionBusiness
);

export const transactionRouter: Router = express.Router();

//Routes

transactionRouter.get('/get-cashIn', transactionController.getCashIn);
transactionRouter.get('/get-cashOut', transactionController.getCashOut);

transactionRouter.post('/cash-out', transactionController.cashOut);
transactionRouter.post("/user/deposit", transactionController.depositBalance)
