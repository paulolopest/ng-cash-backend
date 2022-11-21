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
exports.UserController = void 0;
class UserController {
    constructor(userBusiness) {
        this.userBusiness = userBusiness;
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const result = yield this.userBusiness.signup(username, password);
                res.status(200).send(result);
            }
            catch (error) {
                res.send(error.message);
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const result = yield this.userBusiness.login(username, password);
                res.send(result);
            }
            catch (error) {
                res.send(error.message);
            }
        });
        this.getBalance = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const result = yield this.userBusiness.getBalance(token);
                res.send(result);
            }
            catch (error) {
                res.send(error.message);
            }
        });
        this.changePassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { currentPassword, newPassword } = req.body;
                yield this.userBusiness.changePassword(token, currentPassword, newPassword);
                res.send('Password updated');
            }
            catch (error) {
                res.send(error.message);
            }
        });
        this.changeUsername = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const { newUsername } = req.body;
                yield this.userBusiness.changeUsername(token, newUsername);
                res.send(`Username changed to ${newUsername}`);
            }
            catch (error) {
                res.send(error.message);
            }
        });
        this.getProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const result = yield this.userBusiness.getProfile(token);
                res.send(result);
            }
            catch (error) {
                res.send(error.message);
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                yield this.userBusiness.deleteUser(token);
                res.send('User deleted');
            }
            catch (error) {
                res.send(error.message);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map