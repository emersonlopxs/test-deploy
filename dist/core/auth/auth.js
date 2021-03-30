"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = auth;

var helpers = _interopRequireWildcard(require("~/helpers"));

var _errors = require("~/errors");

/**
 * Authentication middleware
 *  - Check for authorization baerer token
 *  - Validate the token
 *  - Put its payload on req.auth
 */
async function auth(req, res, next) {
  const {
    authorization
  } = req.headers;
  const unauthorizedError = new _errors.UnauthorizedError();
  let token;

  if (req.query.token) {
    token = req.query.token;
    delete req.query.token;
  } else {
    if (!authorization) return next(unauthorizedError);
    if (!authorization.startsWith("Bearer ")) return next(unauthorizedError);
    token = authorization.replace(/Bearer /g, "");
  }

  try {
    req.auth = await helpers.jwt.verify(token);
  } catch (err) {
    return next(err);
  }

  return next();
}
//# sourceMappingURL=auth.js.map