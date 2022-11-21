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
exports.UserBusiness = void 0;
const CustomError_1 = require("../models/CustomError");
class UserBusiness {
    constructor(tokenManager, idGenerator, hashManager, userData) {
        this.tokenManager = tokenManager;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.userData = userData;
        this.signup = (username, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!username) {
                    throw new CustomError_1.CustomError(400, 'Enter a username');
                }
                if (username.length < 3) {
                    throw new CustomError_1.CustomError(400, 'The username must be greater than 3');
                }
                if (!password) {
                    throw new CustomError_1.CustomError(400, 'Enter a password');
                }
                if (password.length < 8) {
                    throw new CustomError_1.CustomError(400, 'Password must contain 8 characters');
                }
                const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
                if (!regex.test(password)) {
                    throw new CustomError_1.CustomError(400, 'The password must contain an uppercase character and a number');
                }
                const verifyUsername = yield this.userData.getUserByUsername(username);
                if (verifyUsername) {
                    throw new CustomError_1.CustomError(400, 'Username already exist');
                }
                const hashPassword = yield this.hashManager.hash(password);
                const id = this.idGenerator.generate();
                const accountId = this.idGenerator.generate();
                const token = this.tokenManager.generate({ id, accountId });
                yield this.userData.signup(id, username, hashPassword, accountId);
                return token;
            }
            catch (error) {
                throw new CustomError_1.CustomError(500, error.message);
            }
        });
        this.login = (username, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!username) {
                    throw new CustomError_1.CustomError(400, 'Enter a username');
                }
                if (username.length < 3) {
                    throw new CustomError_1.CustomError(403, 'Invalid username');
                }
                if (!password) {
                    throw new CustomError_1.CustomError(400, 'Enter a password');
                }
                const user = yield this.userData.getUserByUsername(username);
                if (!user) {
                    throw new CustomError_1.CustomError(403, 'User not exist');
                }
                const verifyPassword = yield this.hashManager.verify(password, user.password);
                if (!verifyPassword) {
                    throw new CustomError_1.CustomError(403, 'Incorrect password');
                }
                const id = user.id;
                const accountId = user.account_id;
                const token = this.tokenManager.generate({ id, accountId });
                return token;
            }
            catch (error) {
                throw new CustomError_1.CustomError(500, error.message);
            }
        });
        this.getBalance = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(409, 'Login first');
                }
                const user = this.tokenManager.getTokenData(token);
                if (!user) {
                    throw new CustomError_1.CustomError(404, 'Fatal Error');
                }
                const result = yield this.userData.getBalance(user.accountId);
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(500, error.message);
            }
        });
        this.changePassword = (token, currentPassword, newPassword) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(409, 'Login first');
                }
                if (!currentPassword) {
                    throw new CustomError_1.CustomError(400, 'Enter a current password');
                }
                if (newPassword === currentPassword) {
                    throw new CustomError_1.CustomError(400, 'The password cannot be the same');
                }
                if (!newPassword) {
                    throw new CustomError_1.CustomError(400, 'Enter a new password');
                }
                if (newPassword.length < 8) {
                    throw new CustomError_1.CustomError(400, 'Password must contain 8 characters');
                }
                const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
                if (!regex.test(newPassword)) {
                    throw new CustomError_1.CustomError(400, 'The password must contain an uppercase character and a number');
                }
                const id = this.tokenManager.getTokenData(token);
                const user = yield this.userData.getUserById(id.id);
                if (!user) {
                    throw new CustomError_1.CustomError(404, 'User not found');
                }
                const verifyPassword = yield this.hashManager.verify(currentPassword, user.password);
                if (!verifyPassword) {
                    throw new CustomError_1.CustomError(403, 'Incorrect password');
                }
                const hashPassword = yield this.hashManager.hash(newPassword);
                yield this.userData.changePassword(user.id, hashPassword);
            }
            catch (error) {
                throw new CustomError_1.CustomError(500, error.message);
            }
        });
        this.changeUsername = (token, newUsername) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(409, 'Login first');
                }
                if (!newUsername) {
                    throw new CustomError_1.CustomError(400, 'Enter a username');
                }
                if (newUsername.length < 3) {
                    throw new CustomError_1.CustomError(400, 'The username must be greater than 3');
                }
                const id = this.tokenManager.getTokenData(token);
                const user = yield this.userData.getUserById(id.id);
                if (!user) {
                    throw new CustomError_1.CustomError(404, 'User not found');
                }
                yield this.userData.changeUsername(id.id, newUsername);
            }
            catch (error) {
                throw new CustomError_1.CustomError(500, error.message);
            }
        });
        this.getProfile = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(409, 'Login first');
                }
                const user = this.tokenManager.getTokenData(token);
                const result = yield this.userData.getProfile(user.id);
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(500, error.message);
            }
        });
        this.deleteUser = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(409, 'Login first');
                }
                const user = this.tokenManager.getTokenData(token);
                yield this.userData.deleteUser(user.id);
            }
            catch (error) {
                throw new CustomError_1.CustomError(500, error.message);
            }
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map