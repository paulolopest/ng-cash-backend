"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, username, password, accountId) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.accountId = accountId;
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
        return this.accountId;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map