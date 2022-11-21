import { CustomError } from '../models/CustomError';
import { prismaClient } from './BaseDatabase';
import { Transaction } from '@prisma/client';

export class TransactionData {
	cashOut = async (
		id: string,
		senderId: string,
		receiverId: string,
		value: number
	): Promise<Transaction> => {
		try {
			const result: Transaction = await prismaClient.transaction.create({
				data: {
					id,
					sender_id: senderId,
					receiver_id: receiverId,
					value,
				},
			});

			await prismaClient.account.update({
				where: {
					id: senderId,
				},
				data: {
					balance: {
						decrement: value,
					},
				},
			});

			await prismaClient.account.update({
				where: {
					id: receiverId,
				},
				data: {
					balance: {
						increment: value,
					},
				},
			});

			return result;
		} catch (error: any) {
			throw new CustomError(500, error.message);
		}
	};

	getCashOut = async (id: string): Promise<Transaction[]> => {
		try {
			const result: Transaction[] = await prismaClient.transaction.findMany({
				where: {
					sender_id: id,
				},
				orderBy: { created_at: 'desc' },
			});

			return result;
		} catch (error: any) {
			throw new CustomError(500, error.message);
		}
	};

	getCashIn = async (id: string): Promise<Transaction[]>	=> {
		try {
			const result: Transaction[] = await prismaClient.transaction.findMany({
				where: {
					receiver_id: id,
				},

				orderBy: { created_at: 'desc' },
			});

			return result;
		} catch (error: any) {
			throw new CustomError(500, error.message);
		}
	};


	// Additional ----------Additional ----------Additional ----------Additional ----------
	// Additional ----------Additional ----------Additional ----------Additional ----------
	

	depositBalance = async(accountId: string, value: number) => {
		try {
			await prismaClient.account.update({
				data: {
					balance: {increment: value}
				},
				where: {
					id: accountId
				}
			})
		} catch (error:any) {
			throw new CustomError(500, error.message)
		}
	}
}
