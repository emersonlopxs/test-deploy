"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insert = void 0;

var models = _interopRequireWildcard(require("~/models"));

var _login = require("~/handlers/oauth/login");

var _config = require("~/core/config");

const insert = params => models.teachers.insert(params).then(() => {
  var _params$password;

  return (0, _login.login)({
    username: params.email,
    password: (_params$password = params.password) !== null && _params$password !== void 0 ? _params$password : _config.DEFAULT_PASSWORD
  });
});

exports.insert = insert;
//# sourceMappingURL=insert.js.map