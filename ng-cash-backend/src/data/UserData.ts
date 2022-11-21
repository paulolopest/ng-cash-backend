import { CustomError } from '../models/CustomError';
import { prismaClient } from './BaseDatabase';
import { User } from '@prisma/client';

export class UserData {
	signup = async (
		id: string,
		username: string,
		password: string,
		account_id: string
	) => {
		try {
			await prismaClient.account.create({
				data: {
					id: account_id,
					balance: 100,
				},
			});

			await prismaClient.user.create({
				data: {
					id,
					username,
					password,
					account_id,
				},
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getBalance = async (accountId: string) => {
		try {
			const result = await prismaClient.account.findUnique({
				select: { balance: true },
				where: { id: accountId },
			});

			return result;
		} catch (error: any) {
			throw new CustomError(500, error.message);
		}
	};

	// Additional ----------Additional ----------Additional ----------Additional ----------
	// Additional ----------Additional ----------Additional ----------Additional ----------

	changePassword = async (id: string, newPassword: string) => {
		try {
			await prismaClient.user.update({
				data: { password: newPassword },
				where: { id },
			});
		} catch (error: any) {
			throw new CustomError(500, error.message);
		}
	};

	changeUsername = async (id: string, newUsername: string) => {
		try {
			await prismaClient.user.update({
				data: { username: newUsername },
				where: { id },
			});
		} catch (error: any) {
			throw new CustomError(500, error.message);
		}
	};

	getProfile = async (id: string) => {
		try {
			const result: User | null = await prismaClient.user.findUnique({
				where: { id },
			});

			return result;
		} catch (error: any) {
			throw new CustomError(500, error.message);
		}
	};

	getUserByUsername = async (username: string): Promise<User | null> => {
		try {
			const result: User | null = await prismaClient.user.findFirst({
				where: { username },
			});

			return result;
		} catch (error: any) {
			throw new CustomError(500, error.message);
		}
	};

	getUserById = async (id: string) => {
		try {
			const result = await prismaClient.user.findUnique({
				select: { id: true, username: true, password: true },
				where: { id },
			});

			return result;
		} catch (error: any) {
			throw new CustomError(500, error.message);
		}
	};

	deleteUser = async (id: string) => {
		try {
			await prismaClient.user.delete({
				where: { id },
			});
		} catch (error: any) {
			throw new CustomError(500, error.message);
		}
	};
}
