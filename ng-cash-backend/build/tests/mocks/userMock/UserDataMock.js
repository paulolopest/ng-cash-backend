"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.account = exports.userMock = exports.UserDataMock = void 0;
const UserData_1 = require("../../../src/data/UserData");
jest.mock('../../../src/data/UserData');
exports.UserDataMock = UserData_1.UserData;
exports.userMock = {
    id: 'mocked_id',
    username: 'paulo',
    password: 'Paulo123',
    accountId: 'mocked_accountId',
};
exports.account = {
    id: exports.userMock.id,
    balance: 100,
};
//# sourceMappingURL=UserDataMock.js.map