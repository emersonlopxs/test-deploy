"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExposableError = void 0;

var _errorWithCode = require("./error-with-code");

class ExposableError extends _errorWithCode.ErrorWithCode {
  constructor(message, statusCode, innerError) {
    super(message);
    this.code = "ERR_EXPOSABLE_ERROR";
    this.statusCode = statusCode;
    this.status = statusCode;
    this.innerError = innerError;
  }

}

exports.ExposableError = ExposableError;
//# sourceMappingURL=exposable-error.js.map