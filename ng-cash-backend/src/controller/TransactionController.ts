import { TransactionBusiness } from '../business/TransactionBusiness';
import { Transaction } from '@prisma/client';
import { Request, Response } from 'express';

export class TransactionController {
	constructor(private transactionBusiness: TransactionBusiness) {}

	cashOut = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { value, username } = req.body;

			await this.transactionBusiness.cashOut(token, username, value);

			res.send(`${value} dollars transferred to ${username}`);
		} catch (error: any) {
			res.send(error.message);
		}
	};

	getCashOut = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;

			const result: string | Transaction[] = await this.transactionBusiness.getCashOut(token);

			res.send(result);
		} catch (error: any) {
			res.send(error.message);
		}
	};

	getCashIn = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;

			const result: string | Transaction[] = await this.transactionBusiness.getCashIn(token);

			res.send(result);
		} catch (error: any) {
			res.send(error.message);
		}
	};


	// Additional ----------Additional ----------Additional ----------Additional ----------
	// Additional ----------Additional ----------Additional ----------Additional ----------
	

	depositBalance = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string
			const {value} = req.body

			await this.transactionBusiness.depositBalance(token, value)

			res.send(`${value} dollars was deposited in your account`)
		} catch (error:any) {
			res.send(error.message)
		}
	}
}
