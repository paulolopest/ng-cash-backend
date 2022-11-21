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
exports.TransactionData = void 0;
const CustomError_1 = require("../models/CustomError");
const BaseDatabase_1 = require("./BaseDatabase");
class TransactionData {
    constructor() {
        this.cashOut = (id, senderId, receiverId, value) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.prismaClient.transaction.create({
                    data: {
                        id,
                        sender_id: senderId,
                        receiver_id: receiverId,
                        value,
                    },
                });
                yield BaseDatabase_1.prismaClient.account.update({
                    where: {
                        id: senderId,
                    },
                    data: {
                        balance: {
                            decrement: value,
                        },
                    },
                });
                yield BaseDatabase_1.prismaClient.account.update({
                    where: {
                        id: receiverId,
                    },
                    data: {
                        balance: {
                            increment: value,
                        },
                    },
                });
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(500, error.message);
            }
        });
        this.getCashOut = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.prismaClient.transaction.findMany({
                    where: {
                        sender_id: id,
                    },
                    orderBy: { created_at: 'desc' },
                });
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(500, error.message);
            }
        });
        this.getCashIn = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.prismaClient.transaction.findMany({
                    where: {
                        receiver_id: id,
                    },
                    orderBy: { created_at: 'desc' },
                });
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(500, error.message);
            }
        });
        this.depositBalance = (accountId, value) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.prismaClient.account.update({
                    data: {
                        balance: { increment: value }
                    },
                    where: {
                        id: accountId
                    }
                });
            }
            catch (error) {
                throw new CustomError_1.CustomError(500, error.message);
            }
        });
    }
}
exports.TransactionData = TransactionData;
//# sourceMappingURL=TransactionData.js.map