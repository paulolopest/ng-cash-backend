import { UserBusiness } from '../business/UserBusiness';
import { Request, Response } from 'express';
import { User } from '@prisma/client';

export class UserController {
	constructor(private userBusiness: UserBusiness) {}

	signup = async (req: Request, res: Response) => {
		try {
			const { username, password } = req.body;
			const result: string = await this.userBusiness.signup(username, password);

			res.status(200).send(result);
		} catch (error: any) {
			res.send(error.message);
		}
	};

	login = async (req: Request, res: Response) => {
		try {
			const { username, password } = req.body;
			const result: string = await this.userBusiness.login(username, password);

			res.send(result);
		} catch (error: any) {
			res.send(error.message);
		}
	};

	getBalance = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const result = await this.userBusiness.getBalance(token);

			res.send(result);
		} catch (error: any) {
			res.send(error.message);
		}
	};


	// Additional ----------Additional ----------Additional ----------Additional ----------
	// Additional ----------Additional ----------Additional ----------Additional ----------
	

	changePassword = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { currentPassword, newPassword } = req.body;
			await this.userBusiness.changePassword(
				token,
				currentPassword,
				newPassword
			);

			res.send('Password updated');
		} catch (error: any) {
			res.send(error.message);
		}
	};

	changeUsername = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { newUsername } = req.body;
			await this.userBusiness.changeUsername(token, newUsername);

			res.send(`Username changed to ${newUsername}`);
		} catch (error: any) {
			res.send(error.message);
		}
	};

	getProfile = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const result: User | null = await this.userBusiness.getProfile(token);

			res.send(result);
		} catch (error: any) {
			res.send(error.message);
		}
	};

	deleteUser = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			await this.userBusiness.deleteUser(token);

			res.send('User deleted');
		} catch (error: any) {
			res.send(error.message);
		}
	};
}
