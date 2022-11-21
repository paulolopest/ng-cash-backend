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
exports.TransactionController = void 0;
class TransactionController {
    constructor(transactionBusiness) {
        this.transactionBusiness = transactionBusiness;
        this.cashOut = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { value, username } = req.body;
                yield this.transactionBusiness.cashOut(token, username, value);
                res.send(`${value} dollars transferred to ${username}`);
            }
            catch (error) {
                res.send(error.message);
            }
        });
        this.getCashOut = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const result = yield this.transactionBusiness.getCashOut(token);
                res.send(result);
            }
            catch (error) {
                res.send(error.message);
            }
        });
        this.getCashIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const result = yield this.transactionBusiness.getCashIn(token);
                res.send(result);
            }
            catch (error) {
                res.send(error.message);
            }
        });
        this.depositBalance = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { value } = req.body;
                yield this.transactionBusiness.depositBalance(token, value);
                res.send(`${value} dollars was deposited in your account`);
            }
            catch (error) {
                res.send(error.message);
            }
        });
    }
}
exports.TransactionController = TransactionController;
//# sourceMappingURL=TransactionController.js.map