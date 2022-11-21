"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const UserController_1 = require("../controller/UserController");
const UserBusiness_1 = require("../business/UserBusiness");
const TokenManager_1 = require("../services/TokenManager");
const IdGenerator_1 = require("../services/IdGenerator");
const HashManager_1 = require("../services/HashManager");
const UserData_1 = require("../data/UserData");
const express_1 = __importDefault(require("express"));
const userBusiness = new UserBusiness_1.UserBusiness(new TokenManager_1.TokenManager(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager(), new UserData_1.UserData());
const userController = new UserController_1.UserController(userBusiness);
exports.userRouter = express_1.default.Router();
exports.userRouter.post('/login', userController.login);
exports.userRouter.post('/signup', userController.signup);
exports.userRouter.get('/profile', userController.getProfile);
exports.userRouter.get('/user/get-balance', userController.getBalance);
exports.userRouter.put('/user/change-password', userController.changePassword);
exports.userRouter.put('/user/change-username', userController.changeUsername);
exports.userRouter.delete('/user/delete', userController.deleteUser);
//# sourceMappingURL=UserRouter.js.map