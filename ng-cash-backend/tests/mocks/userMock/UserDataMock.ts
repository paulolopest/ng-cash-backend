import { UserData } from '../../../src/data/UserData';

jest.mock('../../../src/data/UserData');

export const UserDataMock = UserData as jest.Mock<UserData>;

export const userMock = {
	id: 'mocked_id',
	username: 'paulo',
	password: 'Paulo123',
	accountId: 'mocked_accountId',
};

export const account = {
	id: userMock.id,
	balance: 100,
};
