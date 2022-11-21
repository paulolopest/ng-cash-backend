"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const TransactionDataMock_1 = require("./mocks/transactionMock/TransactionDataMock");
const TransactionBusiness_1 = require("../src/business/TransactionBusiness");
const TokenManagerMock_1 = require("./mocks/servicesMock/TokenManagerMock");
const IdGeneratorMock_1 = require("./mocks/servicesMock/IdGeneratorMock");
const UserDataMock_1 = require("./mocks/userMock/UserDataMock");
const transactionBusinessMock = new TransactionBusiness_1.TransactionBusiness(new TransactionDataMock_1.TransactionDataMock(), new TokenManagerMock_1.TokenManagerMock(), new IdGeneratorMock_1.IdGeneratorMock(), new UserDataMock_1.UserDataMock());
describe('Cash out test', () => {
    test('Return when token is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield transactionBusinessMock.cashOut('', 'paulo', 100);
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Login first');
        }
    }));
    test('Return when username is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield transactionBusinessMock.cashOut('token', '', 100);
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Enter a username');
        }
    }));
    test('Return when username not found', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            let username = 'paulin';
            if (username != UserDataMock_1.userMock.username) {
                throw new Error('User not found');
            }
            const result = yield transactionBusinessMock.cashOut('token', username, 100);
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('User not found');
        }
    }));
    test('Return when user is trying transfer to yourself', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            let username = 'paulo';
            if (username === UserDataMock_1.userMock.username) {
                throw new Error('You cannot transfer to yourself');
            }
            const result = yield transactionBusinessMock.cashOut('token', username, 100);
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('You cannot transfer to yourself');
        }
    }));
    test('Return when balance is too much', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            let balance = 150;
            if (balance > UserDataMock_1.account.balance) {
                throw new Error('You have not this balance');
            }
            const result = yield transactionBusinessMock.cashOut('token', 'paulo', balance);
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('You have not this balance');
        }
    }));
});
describe('Get Cash Out test', () => {
    test('Return when token is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield transactionBusinessMock.getCashOut('');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Login first');
        }
    }));
});
describe('Get In Out test', () => {
    test('Return when token is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield transactionBusinessMock.getCashIn('');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Login first');
        }
    }));
});
describe('Deposit Balance test', () => {
    test('Return when token is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield transactionBusinessMock.depositBalance('', 100);
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Login first');
        }
    }));
    test('Return when value is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield transactionBusinessMock.depositBalance('token', 0);
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Enter a value');
        }
    }));
    test('Return when value is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield transactionBusinessMock.depositBalance('token', -10);
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Invalid value');
        }
    }));
});
//# sourceMappingURL=TransactionBusiness.test.js.map