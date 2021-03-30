"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.databaseMutator = void 0;

var _errors = require("~/errors");

const databaseMutator = (error, req, res, next) => {
  var _error$code;

  if (error.sqlMessage || (_error$code = error.code) !== null && _error$code !== void 0 && _error$code.startsWith("ERR_DATABASE_")) {
    return next(new _errors.ExposableError(error.message, 400, error));
  }

  return next(error);
};

exports.databaseMutator = databaseMutator;
//# sourceMappingURL=database-mutator.js.map