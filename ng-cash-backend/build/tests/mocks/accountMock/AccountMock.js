"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountMock = exports.AccountMock = void 0;
class AccountMock {
    constructor(id, balance) {
        this.id = id;
        this.balance = balance;
    }
    getId() {
        return this.id;
    }
    getBalance() {
        return this.balance;
    }
}
exports.AccountMock = AccountMock;
exports.accountMock = new AccountMock('mocked_accountId', 100);
//# sourceMappingURL=AccountMock.js.map