import { TransactionData } from '../../../src/data/TransactionData';
import { Transaction } from '../../../src/models/Transaction';

jest.mock('../../../src/data/TransactionData');

export const TransactionDataMock =
	TransactionData as jest.Mock<TransactionData>;

export const transactionMock = new Transaction(
	'mocked_id',
	'debited_id',
	'credited_id',
	100
);
