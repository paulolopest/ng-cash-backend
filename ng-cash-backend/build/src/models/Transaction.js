"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
class Transaction {
    constructor(id, debitedAccountId, creditedAccountId, value) {
        this.id = id;
        this.debitedAccountId = debitedAccountId;
        this.creditedAccountId = creditedAccountId;
        this.value = value;
    }
    getId() {
        return this.id;
    }
    getDebitedAccountId() {
        return this.debitedAccountId;
    }
    getCreditedAccountId() {
        return this.creditedAccountId;
    }
    getValue() {
        return this.value;
    }
}
exports.Transaction = Transaction;
//# sourceMappingURL=Transaction.js.map