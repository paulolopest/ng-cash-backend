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
exports.UserData = void 0;
const CustomError_1 = require("../models/CustomError");
const BaseDatabase_1 = require("./BaseDatabase");
class UserData {
    constructor() {
        this.signup = (id, username, password, account_id) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.prismaClient.account.create({
                    data: {
                        id: account_id,
                        balance: 100,
                    },
                });
                yield BaseDatabase_1.prismaClient.user.create({
                    data: {
                        id,
                        username,
                        password,
                        account_id,
                    },
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getBalance = (accountId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.prismaClient.account.findUnique({
                    select: { balance: true },
                    where: { id: accountId },
                });
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(500, error.message);
            }
        });
        this.changePassword = (id, newPassword) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.prismaClient.user.update({
                    data: { password: newPassword },
                    where: { id },
                });
            }
            catch (error) {
                throw new CustomError_1.CustomError(500, error.message);
            }
        });
        this.changeUsername = (id, newUsername) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.prismaClient.user.update({
                    data: { username: newUsername },
                    where: { id },
                });
            }
            catch (error) {
                throw new CustomError_1.CustomError(500, error.message);
            }
        });
        this.getProfile = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.prismaClient.user.findUnique({
                    where: { id },
                });
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(500, error.message);
            }
        });
        this.getUserByUsername = (username) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.prismaClient.user.findFirst({
                    where: { username },
                });
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(500, error.message);
            }
        });
        this.getUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.prismaClient.user.findUnique({
                    select: { id: true, username: true, password: true },
                    where: { id },
                });
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(500, error.message);
            }
        });
        this.deleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.prismaClient.user.delete({
                    where: { id },
                });
            }
            catch (error) {
                throw new CustomError_1.CustomError(500, error.message);
            }
        });
    }
}
exports.UserData = UserData;
//# sourceMappingURL=UserData.js.map