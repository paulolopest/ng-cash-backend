"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMock = exports.UserMock = void 0;
class UserMock {
    constructor(id, username, password, account_id) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.account_id = account_id;
    }
    getId() {
        return this.id;
    }
    getUsername() {
        return this.username;
    }
    getPassword() {
        return this.password;
    }
    getAccountId() {
        return this.account_id;
    }
}
exports.UserMock = UserMock;
exports.userMock = new UserMock('mocked_id', 'paulo', 'Paulo123', 'mocked_accountId');
//# sourceMappingURL=UserMock.js.map