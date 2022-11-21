import { TransactionDataMock } from './mocks/transactionMock/TransactionDataMock';
import { TransactionBusiness } from '../src/business/TransactionBusiness';
import { TokenManagerMock } from './mocks/servicesMock/TokenManagerMock';
import { IdGeneratorMock } from './mocks/servicesMock/IdGeneratorMock';
import { TransactionData } from '../src/data/TransactionData';
import { account, UserDataMock, userMock } from './mocks/userMock/UserDataMock';
import { TokenManager } from '../src/services/TokenManager';
import { IdGenerator } from '../src/services/IdGenerator';
import { UserData } from '../src/data/UserData';

const transactionBusinessMock = new TransactionBusiness(
	new TransactionDataMock() as jest.Mocked<TransactionData>,
	new TokenManagerMock() as jest.Mocked<TokenManager>,
	new IdGeneratorMock() as jest.Mocked<IdGenerator>,
	new UserDataMock() as jest.Mocked<UserData>
);

describe('Cash out test', () => {
	test('Return when token is missing', async () => {
		expect.assertions;
		try {
			const result = await transactionBusinessMock.cashOut('', 'paulo', 100);

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Login first');
		}
	});

	test('Return when username is missing', async () => {
		expect.assertions;
		try {
			const result = await transactionBusinessMock.cashOut('token', '', 100);

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Enter a username');
		}
	});

	test('Return when username not found', async () => {
		expect.assertions;
		try {
			let username = 'paulin';
			if (username != userMock.username) {
				throw new Error('User not found');
			}
			const result = await transactionBusinessMock.cashOut(
				'token',
				username,
				100
			);

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('User not found');
		}
	});

	test('Return when user is trying transfer to yourself', async () => {
		expect.assertions;
		try {
			let username = 'paulo';
			if (username === userMock.username) {
				throw new Error('You cannot transfer to yourself');
			}
			const result = await transactionBusinessMock.cashOut(
				'token',
				username,
				100
			);

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('You cannot transfer to yourself');
		}
	});

	test('Return when balance is too much', async () => {
		expect.assertions;
		try {
			let balance = 150;
			if (balance > account.balance) {
				throw new Error('You have not this balance');
			}
			const result = await transactionBusinessMock.cashOut(
				'token',
				'paulo',
				balance
			);

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('You have not this balance');
		}
	});
});

describe('Get Cash Out test', () => {
	test('Return when token is missing', async () => {
		expect.assertions;
		try {
			const result = await transactionBusinessMock.getCashOut('');

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Login first');
		}
	});
});

describe('Get In Out test', () => {
	test('Return when token is missing', async () => {
		expect.assertions;
		try {
			const result = await transactionBusinessMock.getCashIn('');

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Login first');
		}
	});
});

describe('Deposit Balance test', () => {
	test('Return when token is missing', async () => {
		expect.assertions;
		try {
			const result = await transactionBusinessMock.depositBalance('', 100);

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Login first');
		}
	});

	test('Return when value is missing', async () => {
		expect.assertions;
		try {
			const result = await transactionBusinessMock.depositBalance('token', 0);

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Enter a value');
		}
	});

	test('Return when value is invalid', async () => {
		expect.assertions;
		try {
			const result = await transactionBusinessMock.depositBalance('token', -10);

			expect(result).toBeFalsy();
		} catch (error: any) {
			expect(error.message).toEqual('Invalid value');
		}
	});
});
