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
const TokenManagerMock_1 = require("./mocks/servicesMock/TokenManagerMock");
const HashManagerMock_1 = require("./mocks/servicesMock/HashManagerMock");
const IdGeneratorMock_1 = require("./mocks/servicesMock/IdGeneratorMock");
const UserDataMock_1 = require("./mocks/userMock/UserDataMock");
const UserBusiness_1 = require("../src/business/UserBusiness");
const userBusinessMock = new UserBusiness_1.UserBusiness(new TokenManagerMock_1.TokenManagerMock(), new IdGeneratorMock_1.IdGeneratorMock(), new HashManagerMock_1.HashManagerMock(), new UserDataMock_1.UserDataMock());
describe('Signup test', () => {
    test('Return when username is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.signup('', 'Paulo123');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Enter a username');
        }
    }));
    test('Return when username is less than 3 char', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.signup('pa', 'Paulo123');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('The username must be greater than 3');
        }
    }));
    test('Return when password is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.signup('paulo', '');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Enter a password');
        }
    }));
    test('Return when password is less than 8 char', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.signup('paulo', 'Paulo12');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Password must contain 8 characters');
        }
    }));
    test('Return when password have not a number or an uppercase char', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.signup('paulo', 'paulinhotrem');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('The password must contain an uppercase character and a number');
        }
    }));
    test('Return when username already exist', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            let username = 'paulo';
            if (username === UserDataMock_1.userMock.username) {
                throw new Error('Username already exist');
            }
            const result = yield userBusinessMock.signup(username, 'Paulo124');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Username already exist');
        }
    }));
});
describe('Login test', () => {
    test('Return when username is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.login('', 'Paulo123');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Enter a username');
        }
    }));
    test('Return when username is les than 3 char', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.login('pa', 'Paulo123');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Invalid username');
        }
    }));
    test('Return when password is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.login('paulo', '');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Enter a password');
        }
    }));
    test('Return when username is wrong', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            let username = 'parluin';
            if (username != UserDataMock_1.userMock.username) {
                throw new Error('User not exist');
            }
            const result = yield userBusinessMock.signup(username, 'Paulo124');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('User not exist');
        }
    }));
    test('Return when password in incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            let password = 'Paulo1234';
            if (password != UserDataMock_1.userMock.password) {
                throw new Error('Incorrect password');
            }
            const result = yield userBusinessMock.signup('paulo123', password);
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Incorrect password');
        }
    }));
});
describe('Get Balance test', () => {
    test('Return when token is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.getBalance('');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Login first');
        }
    }));
});
describe('Change Password test', () => {
    test('Return when token is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.changePassword('', 'Paulo123', '123Paulo');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Login first');
        }
    }));
    test('Return when current password is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.changePassword('token', '', '123Paulo');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Enter a current password');
        }
    }));
    test('Return when the passwords is equal', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.changePassword('token', '123Paulo', '123Paulo');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('The password cannot be the same');
        }
    }));
    test('Return when new password is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.changePassword('token', '123Paulo', '');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Enter a new password');
        }
    }));
    test('Return when password have not a number or an uppercase char', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.changePassword('token', '123Paulo', 'aulinho1');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('The password must contain an uppercase character and a number');
        }
    }));
    test('Return when current password in incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            let currentPassword = 'Paulo1234';
            if (currentPassword != UserDataMock_1.userMock.password) {
                throw new Error('Incorrect password');
            }
            const result = yield userBusinessMock.changePassword('token', currentPassword, 'paulo123');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Incorrect password');
        }
    }));
});
describe('Change Username test', () => {
    test('Return when token is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.changeUsername('', 'mimdepapai');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Login first');
        }
    }));
    test('Return when new username is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.changeUsername('token', '');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Enter a username');
        }
    }));
    test('Return when new username is less than 3 char', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.changeUsername('token', 'mi');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('The username must be greater than 3');
        }
    }));
});
describe('Get Profile test', () => {
    test('Return when token is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.getProfile('');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Login first');
        }
    }));
});
describe('Delete User test', () => {
    test('Return when token is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions;
        try {
            const result = yield userBusinessMock.deleteUser('');
            expect(result).toBeFalsy();
        }
        catch (error) {
            expect(error.message).toEqual('Login first');
        }
    }));
});
//# sourceMappingURL=UserBusiness.test.js.map