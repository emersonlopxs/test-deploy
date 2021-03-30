"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BadRequestError = void 0;

var _exposableError = require("./exposable-error");

class BadRequestError extends _exposableError.ExposableError {
  constructor(message) {
    super(message, 400);
  }

}

exports.BadRequestError = BadRequestError;
//# sourceMappingURL=bad-request-error.js.map