"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify = exports.hash = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _errors = require("~/errors");

var _config = require("~/core/config");

/**
 * Hash the password in bcrypt
 * @param {string} password
 */
const hash = password => _bcrypt.default.hash(password, Number(_config.BCRYPT_ROUNDS || 10));
/**
 * Check if password is correct, if not throw UnauthorizedError()
 * @param {string} password
 * @param {string} hashed
 */


exports.hash = hash;

const verify = async (password, hashed) => {
  const isValid = await _bcrypt.default.compare(password, hashed);
  if (!isValid) throw new _errors.UnauthorizedError();
};

exports.verify = verify;
//# sourceMappingURL=password.js.map