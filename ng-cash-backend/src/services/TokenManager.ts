import * as jwt from 'jsonwebtoken';
import { AuthenticationData } from '../models/AuthenticationData';

export class TokenManager {
	generate = (id: AuthenticationData): string => {
		return jwt.sign(id, process.env.SECRET_KEY as jwt.Secret, {
			expiresIn: process.env.EXPIRES_VALUE,
		});
	};

	getTokenData = (token: string): AuthenticationData => {
		return jwt.verify(
			token,
			process.env.SECRET_KEY as jwt.Secret
		) as AuthenticationData;
	};
}
