import { AuthenticationData } from '../models/AuthenticationData';
import { TokenManager } from '../services/TokenManager';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';
import { CustomError } from '../models/CustomError';
import { UserData } from '../data/UserData';
import { User } from '@prisma/client';

export class UserBusiness {
	constructor(
		private tokenManager: TokenManager,
		private idGenerator: IdGenerator,
		private hashManager: HashManager,
		private userData: UserData
	) {}

	signup = async (username: string, password: string): Promise<string> => {
		try {
			if (!username) {
				throw new CustomError(400, 'Enter a username');
			}
			if (username.length < 3) {
				throw new CustomError(400, 'The username must be greater than 3');
			}
			if (!password) {
				throw new CustomError(400, 'Enter a password');
			}
			if (password.length < 8) {
				throw new CustomError(400, 'Password must contain 8 characters');
			}

			const regex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
			if (!regex.test(password)) {
				throw new CustomError(
					400,
					'The password must contain an uppercase character and a number'
				);
			}

			const verifyUsername: User | null = await this.userData.getUserByUsername(
				username
			);
			if (verifyUsername) {
				throw new CustomError(400, 'Username already exist');
			}

			const hashPassword: string = await this.hashManager.hash(password);

			const id: string = this.idGenerator.generate();
			const accountId: string = this.idGenerator.generate();
			const token: string = this.tokenManager.generate({ id, accountId });

			await this.userData.signup(id, username, hashPassword, accountId);

			return token;
		} catch (error: any) {
			throw new CustomError(500, error.message);
		}
	};

	login = async (username: string, password: string): Promise<string> => {
		try {
			if (!username) {
				throw new CustomError(400, 'Enter a username');
			}
			if (username.length < 3) {
				throw new CustomError(403, 'Invalid username');
			}
			if (!password) {
				throw new CustomError(400, 'Enter a password');
			}

			const user: User | null = await this.userData.getUserByUsername(username);
			if (!user) {
				throw new CustomError(403, 'User not exist');
			}

			const verifyPassword: boolean = await this.hashManager.verify(
				password,
				user.password
			);
			if (!verifyPassword) {
				throw new CustomError(403, 'Incorrect password');
			}

			const id: string = user.id;
			const accountId: string = user.account_id;

			const token: string = this.tokenManager.generate({ id, accountId });

			return token;
		} catch (error: any) {
			throw new CustomError(500, error.message);
		}
	};

	getBalance = async (token: string) => {
		try {
			if (!token) {
				throw new CustomError(409, 'Login first');
			}

			const user: AuthenticationData = this.tokenManager.getTokenData(token);
			if (!user) {
				throw new CustomError(404, 'Fatal Error');
			}

			const result = await this.userData.getBalance(user.accountId);

			return result;
		} catch (error: any) {
			throw new CustomError(500, error.message);
		}
	};

	// Additional ----------Additional ----------Additional ----------Additional ----------
	// Additional ----------Additional ----------Additional ----------Additional ----------

	changePassword = async (
		token: string,
		currentPassword: string,
		newPassword: string
	) => {
		try {
			if (!token) {
				throw new CustomError(409, 'Login first');
			}
			if (!currentPassword) {
				throw new CustomError(400, 'Enter a current password');
			}
			if (newPassword === currentPassword) {
				throw new CustomError(400, 'The password cannot be the same');
			}
			if (!newPassword) {
				throw new CustomError(400, 'Enter a new password');
			}
			if (newPassword.length < 8) {
				throw new CustomError(400, 'Password must contain 8 characters');
			}
			const regex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
			if (!regex.test(newPassword)) {
				throw new CustomError(
					400,
					'The password must contain an uppercase character and a number'
				);
			}

			const id: AuthenticationData = this.tokenManager.getTokenData(token);
			const user = await this.userData.getUserById(id.id);
			if (!user) {
				throw new CustomError(404, 'User not found');
			}

			const verifyPassword: boolean = await this.hashManager.verify(
				currentPassword,
				user.password
			);
			if (!verifyPassword) {
				throw new CustomError(403, 'Incorrect password');
			}

			const hashPassword: string = await this.hashManager.hash(newPassword);

			await this.userData.changePassword(user.id, hashPassword);
		} catch (error: any) {
			throw new CustomError(500, error.message);
		}
	};

	changeUsername = async (token: string, newUsername: string) => {
		try {
			if (!token) {
				throw new CustomError(409, 'Login first');
			}
			if (!newUsername) {
				throw new CustomError(400, 'Enter a username');
			}
			if (newUsername.length < 3) {
				throw new CustomError(400, 'The username must be greater than 3');
			}

			const id: AuthenticationData = this.tokenManager.getTokenData(token);
			const user = await this.userData.getUserById(id.id);

			if (!user) {
				throw new CustomError(404, 'User not found');
			}

			await this.userData.changeUsername(id.id, newUsername);
		} catch (error: any) {
			throw new CustomError(500, error.message);
		}
	};

	getProfile = async (token: string): Promise<User | null> => {
		try {
			if (!token) {
				throw new CustomError(409, 'Login first');
			}

			const user: AuthenticationData = this.tokenManager.getTokenData(token);

			const result: User | null = await this.userData.getProfile(user.id);

			return result;
		} catch (error: any) {
			throw new CustomError(500, error.message);
		}
	};

	deleteUser = async (token: string) => {
		try {
			if (!token) {
				throw new CustomError(409, 'Login first');
			}

			const user: AuthenticationData = this.tokenManager.getTokenData(token);

			await this.userData.deleteUser(user.id);
		} catch (error: any) {
			throw new CustomError(500, error.message);
		}
	};
}
