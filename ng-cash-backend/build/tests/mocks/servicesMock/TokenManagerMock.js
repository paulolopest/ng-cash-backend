"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockedToken = exports.TokenManagerMock = void 0;
const TokenManager_1 = require("../../../src/services/TokenManager");
jest.mock('../../../src/services/TokenManager');
exports.TokenManagerMock = TokenManager_1.TokenManager;
exports.mockedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0Mjc4M2YxLWNkZmYtNDY4MS05ODc2LTUzNjZmMjlhMzdlNSIsImFjY291bnRJZCI6IjZlNGNhNTY0LWQzYWItNGY1OC05YWI5LTdiZWRlMDE3ODEyMSIsImlhdCI6MTY2ODk5Mzc2MiwiZXhwIjoxNjY5MDgwMTYyfQ.8ECQdhll1Io1po20vUJfpeh21QmnFWebNVUMj8vsPSk';
//# sourceMappingURL=TokenManagerMock.js.map