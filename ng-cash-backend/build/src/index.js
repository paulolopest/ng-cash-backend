"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const TransactionRouter_1 = require("./router/TransactionRouter");
const UserRouter_1 = require("./router/UserRouter");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
exports.app = (0, express_1.default)();
const port = process.env.PORT || 3000;
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
const server = exports.app.listen(port, () => {
    if (server) {
        console.log('The server is running on localhost:3000');
    }
    else {
        console.log('Error running server');
    }
});
exports.app.use(UserRouter_1.userRouter);
exports.app.use(TransactionRouter_1.transactionRouter);
//# sourceMappingURL=index.js.map