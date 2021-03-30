"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = void 0;

var models = _interopRequireWildcard(require("~/models"));

var _login = require("~/handlers/oauth/login");

const register = params => models.students.insert(params).then(() => (0, _login.login)({
  username: params.email,
  password: params.password
}));

exports.register = register;
//# sourceMappingURL=register.js.map