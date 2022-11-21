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
exports.TransactionBusiness = void 0;
const CustomError_1 = require("../models/CustomError");
class TransactionBusiness {
    constructor(transactionData, tokenManager, idGenerator, userData) {
        this.transactionData = transactionData;
        this.tokenManager = tokenManager;
        this.idGenerator = idGenerator;
        this.userData = userData;
        this.cashOut = (token, username, value) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(409, 'Login first');
                }
                if (!username) {
                    throw new CustomError_1.CustomError(400, 'Enter a username');
                }
                const sender = this.tokenManager.getTokenData(token);
                const receiver = yield this.userData.getUserByUsername(username);
                if (!receiver) {
                    throw new CustomError_1.CustomError(404, 'User not found');
                }
                const user = yield this.userData.getUserById(sender.id);
                if (username === (user === null || user === void 0 ? void 0 : user.username)) {
                    throw new CustomError_1.CustomError(404, 'You cannot transfer to yourself');
                }
                const senderBalance = yield this.userData.getBalance(sender.accountId);
                if (!senderBalance) {
                    throw new CustomError_1.CustomError(404, 'Balance not found');
                }
                if (senderBalance.balance < value) {
                    throw new CustomError_1.CustomError(400, 'You have not this balance');
                }
                if (value <= 0) {
                    throw new CustomError_1.CustomError(400, 'Select a valid value');
                }
                const id = this.idGenerator.generate();
                yield this.transactionData.cashOut(id, sender.accountId, receiver.account_id, value);
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.getCashOut = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(409, 'Login first');
                }
                const user = this.tokenManager.getTokenData(token);
                const result = yield this.transactionData.getCashOut(user.accountId);
                if (result.length <= 0) {
                    return 'You have not cash out';
                }
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.getCashIn = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(409, 'Login first');
                }
                const user = this.tokenManager.getTokenData(token);
                const result = yield this.transactionData.getCashIn(user.accountId);
                if (result.length <= 0) {
                    return 'You have not cash in';
                }
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
        this.depositBalance = (token, value) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomError_1.CustomError(409, 'Login first');
                }
                if (!value) {
                    throw new CustomError_1.CustomError(400, 'Enter a value');
                }
                if (value <= 0) {
                    throw new CustomError_1.CustomError(400, 'Invalid value');
                }
                const user = this.tokenManager.getTokenData(token);
                yield this.transactionData.depositBalance(user.accountId, value);
            }
            catch (error) {
                throw new CustomError_1.CustomError(404, error.message);
            }
        });
    }
}
exports.TransactionBusiness = TransactionBusiness;
//# sourceMappingURL=TransactionBusiness.js.map