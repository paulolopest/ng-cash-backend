import { AuthenticationData } from '../models/AuthenticationData';
import { TransactionData } from '../data/TransactionData';
import { TokenManager } from '../services/TokenManager';
import { IdGenerator } from '../services/IdGenerator';
import { CustomError } from '../models/CustomError';
import { Transaction, User } from '@prisma/client';
import { UserData } from '../data/UserData';

export class TransactionBusiness {
	constructor(
		private transactionData: TransactionData,
		private tokenManager: TokenManager,
		private idGenerator: IdGenerator,
		private userData: UserData
	) {}

	cashOut = async (token: string, username: string, value: number) => {
		try {
			if (!token) {
				throw new CustomError(409, 'Login first');
			}
			if (!username) {
				throw new CustomError(400, 'Enter a username');
			}

			const sender: AuthenticationData = this.tokenManager.getTokenData(token);
			const receiver: User | null = await this.userData.getUserByUsername(
				username
			);

			if (!receiver) {
				throw new CustomError(404, 'User not found');
			}

			const user = await this.userData.getUserById(sender.id);

			if (username === user?.username) {
				throw new CustomError(404, 'You cannot transfer to yourself');
			}

			const senderBalance = await this.userData.getBalance(sender.accountId);

			if (!senderBalance) {
				throw new CustomError(404, 'Balance not found');
			}
			if (senderBalance.balance < value) {
				throw new CustomError(400, 'You have not this balance');
			}
			if (value <= 0) {
				throw new CustomError(400, 'Select a valid value');
			}

			const id: string = this.idGenerator.generate();

			await this.transactionData.cashOut(
				id,
				sender.accountId,
				receiver.account_id,
				value
			);
		} catch (error: any) {
			throw new CustomError(404, error.message);
		}
	};

	getCashOut = async (token: string): Promise<string | Transaction[]> => {
		try {
			if (!token) {
				throw new CustomError(409, 'Login first');
			}

			const user: AuthenticationData = this.tokenManager.getTokenData(token);

			const result: Transaction[] = await this.transactionData.getCashOut(
				user.accountId
			);

			if (result.length <= 0) {
				return 'You have not cash out';
			}

			return result;
		} catch (error: any) {
			throw new CustomError(404, error.message);
		}
	};

	getCashIn = async (token: string): Promise<string | Transaction[]> => {
		try {
			if (!token) {
				throw new CustomError(409, 'Login first');
			}

			const user = this.tokenManager.getTokenData(token);

			const result = await this.transactionData.getCashIn(user.accountId);

			if (result.length <= 0) {
				return 'You have not cash in';
			}

			return result;
		} catch (error: any) {
			throw new CustomError(404, error.message);
		}
	};

	// Additional ----------Additional ----------Additional ----------Additional ----------
	// Additional ----------Additional ----------Additional ----------Additional ----------

	depositBalance = async (token: string, value: number) => {
		try {
			if (!token) {
				throw new CustomError(409, 'Login first');
			}
			if (!value) {
				throw new CustomError(400, 'Enter a value');
			}
			if (value <= 0) {
				throw new CustomError(400, 'Invalid value');
			}

			const user: AuthenticationData = this.tokenManager.getTokenData(token);

			await this.transactionData.depositBalance(user.accountId, value);
		} catch (error: any) {
			throw new CustomError(404, error.message);
		}
	};
}
