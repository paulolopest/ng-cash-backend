"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRouter = void 0;
const TransactionController_1 = require("../controller/TransactionController");
const TransactionBusiness_1 = require("../business/TransactionBusiness");
const TransactionData_1 = require("../data/TransactionData");
const TokenManager_1 = require("../services/TokenManager");
const IdGenerator_1 = require("../services/IdGenerator");
const UserData_1 = require("../data/UserData");
const express_1 = __importDefault(require("express"));
const transactionBusiness = new TransactionBusiness_1.TransactionBusiness(new TransactionData_1.TransactionData(), new TokenManager_1.TokenManager(), new IdGenerator_1.IdGenerator(), new UserData_1.UserData());
const transactionController = new TransactionController_1.TransactionController(transactionBusiness);
exports.transactionRouter = express_1.default.Router();
exports.transactionRouter.get('/get-cashIn', transactionController.getCashIn);
exports.transactionRouter.get('/get-cashOut', transactionController.getCashOut);
exports.transactionRouter.post('/cash-out', transactionController.cashOut);
exports.transactionRouter.post("/user/deposit", transactionController.depositBalance);
//# sourceMappingURL=TransactionRouter.js.map