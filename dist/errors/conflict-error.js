"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConflictError = void 0;

var _exposableError = require("./exposable-error");

class ConflictError extends _exposableError.ExposableError {
  constructor(message) {
    super(message, 409);
  }

}

exports.ConflictError = ConflictError;
//# sourceMappingURL=conflict-error.js.map