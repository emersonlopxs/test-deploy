"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify = exports.sign = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _util = require("util");

var _config = require("~/core/config");

const jwtSign = (0, _util.promisify)(_jsonwebtoken.default.sign);
const jwtVerify = (0, _util.promisify)(_jsonwebtoken.default.verify);
/**
 * Generate the JWT token with the provided payload
 * @param {*} payload
 */

const sign = payload => jwtSign(payload, _config.JWT_SECRET);
/**
 * Verify if JWT token is valid and return its payload
 * @param {*} token
 */


exports.sign = sign;

const verify = token => jwtVerify(token, _config.JWT_SECRET);

exports.verify = verify;
//# sourceMappingURL=jwt.js.map