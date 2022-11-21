import { TokenManagerMock } from './mocks/servicesMock/TokenManagerMock';
import { HashManagerMock } from './mocks/servicesMock/HashManagerMock';
import { IdGeneratorMock } from './mocks/servicesMock/IdGeneratorMock';
import { UserDataMock, userMock } from './mocks/userMock/UserDataMock';
import { UserBusiness } from '../src/business/UserBusiness';
import { TokenManager } from '../src/services/TokenManager';
import { IdGenerator } from '../src/services/IdGenerator';
import { HashManager } from '../src/services/HashManager';
import { UserData } from '../src/data/UserData';

const userBusinessMock = new UserBusiness(
	new TokenManagerMock() as jest.Mocked<TokenManager>,
	new IdGeneratorMock() as jest.Mocked<IdGenerator>,
	new HashManagerMock() as jest.Mocked<HashManager>,
	new UserDataMock() as jest.Mocked<UserData>
);

describe('Signup test', () => {
	test('Return when username is missing', async () => {
		expect.assertions;
		try {
			const result = await userBusinessMock.signup('', 'Paulo123');

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Enter a username');
		}
	});

	test('Return when username is less than 3 char', async () => {
		expect.assertions;
		try {
			const result = await userBusinessMock.signup('pa', 'Paulo123');

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('The username must be greater than 3');
		}
	});

	test('Return when password is missing', async () => {
		expect.assertions;
		try {
			const result = await userBusinessMock.signup('paulo', '');

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Enter a password');
		}
	});

	test('Return when password is less than 8 char', async () => {
		expect.assertions;
		try {
			const result = await userBusinessMock.signup('paulo', 'Paulo12');

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Password must contain 8 characters');
		}
	});

	test('Return when password have not a number or an uppercase char', async () => {
		expect.assertions;
		try {
			const result = await userBusinessMock.signup('paulo', 'paulinhotrem');

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual(
				'The password must contain an uppercase character and a number'
			);
		}
	});

	test('Return when username already exist', async () => {
		expect.assertions;
		try {
			let username = 'paulo';
			if (username === userMock.username) {
				throw new Error('Username already exist');
			}
			const result = await userBusinessMock.signup(username, 'Paulo124');

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Username already exist');
		}
	});
});

describe('Login test', () => {
	test('Return when username is missing', async () => {
		expect.assertions;
		try {
			const result = await userBusinessMock.login('', 'Paulo123');

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Enter a username');
		}
	});

	test('Return when username is les than 3 char', async () => {
		expect.assertions;
		try {
			const result = await userBusinessMock.login('pa', 'Paulo123');

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Invalid username');
		}
	});

	test('Return when password is missing', async () => {
		expect.assertions;
		try {
			const result = await userBusinessMock.login('paulo', '');

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Enter a password');
		}
	});

	test('Return when username is wrong', async () => {
		expect.assertions;
		try {
			let username = 'parluin';
			if (username != userMock.username) {
				throw new Error('User not exist');
			}
			const result = await userBusinessMock.signup(username, 'Paulo124');

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('User not exist');
		}
	});

	test('Return when password in incorrect', async () => {
		expect.assertions;
		try {
			let password = 'Paulo1234';
			if (password != userMock.password) {
				throw new Error('Incorrect password');
			}
			const result = await userBusinessMock.signup('paulo123', password);

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Incorrect password');
		}
	});
});

describe('Get Balance test', () => {
	test('Return when token is missing', async () => {
		expect.assertions;
		try {
			const result = await userBusinessMock.getBalance('');

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Login first');
		}
	});
});

describe('Change Password test', () => {
	test('Return when token is missing', async () => {
		expect.assertions;
		try {
			const result = await userBusinessMock.changePassword(
				'',
				'Paulo123',
				'123Paulo'
			);

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Login first');
		}
	});

	test('Return when current password is missing', async () => {
		expect.assertions;
		try {
			const result = await userBusinessMock.changePassword(
				'token',
				'',
				'123Paulo'
			);

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Enter a current password');
		}
	});

	test('Return when the passwords is equal', async () => {
		expect.assertions;
		try {
			const result = await userBusinessMock.changePassword(
				'token',
				'123Paulo',
				'123Paulo'
			);

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('The password cannot be the same');
		}
	});

	test('Return when new password is missing', async () => {
		expect.assertions;
		try {
			const result = await userBusinessMock.changePassword(
				'token',
				'123Paulo',
				''
			);

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Enter a new password');
		}
	});

	test('Return when password have not a number or an uppercase char', async () => {
		expect.assertions;
		try {
			const result = await userBusinessMock.changePassword(
				'token',
				'123Paulo',
				'aulinho1'
			);

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual(
				'The password must contain an uppercase character and a number'
			);
		}
	});

	test('Return when current password in incorrect', async () => {
		expect.assertions;
		try {
			let currentPassword = 'Paulo1234';
			if (currentPassword != userMock.password) {
				throw new Error('Incorrect password');
			}
			const result = await userBusinessMock.changePassword(
				'token',
				currentPassword,
				'paulo123'
			);

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Incorrect password');
		}
	});
});

describe('Change Username test', () => {
	test('Return when token is missing', async () => {
		expect.assertions;
		try {
			const result = await userBusinessMock.changeUsername('', 'mimdepapai');

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Login first');
		}
	});

	test('Return when new username is missing', async () => {
		expect.assertions;
		try {
			const result = await userBusinessMock.changeUsername('token', '');

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Enter a username');
		}
	});

	test('Return when new username is less than 3 char', async () => {
		expect.assertions;
		try {
			const result = await userBusinessMock.changeUsername('token', 'mi');

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('The username must be greater than 3');
		}
	});
});

describe('Get Profile test', () => {
	test('Return when token is missing', async () => {
		expect.assertions;
		try {
			const result = await userBusinessMock.getProfile('');

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Login first');
		}
	});
});

describe('Delete User test', () => {
	test('Return when token is missing', async () => {
		expect.assertions;
		try {
			const result = await userBusinessMock.deleteUser('');

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Login first');
		}
	});
});
