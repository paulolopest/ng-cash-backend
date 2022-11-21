"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionMock = exports.TransactionDataMock = void 0;
const TransactionData_1 = require("../../../src/data/TransactionData");
const Transaction_1 = require("../../../src/models/Transaction");
jest.mock('../../../src/data/TransactionData');
exports.TransactionDataMock = TransactionData_1.TransactionData;
exports.transactionMock = new Transaction_1.Transaction('mocked_id', 'debited_id', 'credited_id', 100);
//# sourceMappingURL=TransactionDataMock.js.map