"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restMutator = void 0;

var _errors = require("~/errors");

const restMutator = (error, req, res, next) => {
  var _error$status;

  const status = (_error$status = error.status) !== null && _error$status !== void 0 ? _error$status : error.statusCode;
  const {
    message
  } = error;

  if (status && message) {
    return next(new _errors.ExposableError(message, status, error));
  }

  return next(error);
};

exports.restMutator = restMutator;
//# sourceMappingURL=rest-mutator.js.map