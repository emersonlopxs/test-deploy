"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotFoundError = void 0;

var _exposableError = require("./exposable-error");

class NotFoundError extends _exposableError.ExposableError {
  constructor(message) {
    super(message, 404);
  }

}

exports.NotFoundError = NotFoundError;
//# sourceMappingURL=not-found-error.js.map