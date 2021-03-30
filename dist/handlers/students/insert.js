"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insert = void 0;

var models = _interopRequireWildcard(require("~/models"));

var _login = require("~/handlers/oauth/login");

const insert = params => models.students.insert(params).then(() => (0, _login.login)({
  username: params.email,
  password: process.env.DEFAULT_PASSWORD
}));

exports.insert = insert;
//# sourceMappingURL=insert.js.map