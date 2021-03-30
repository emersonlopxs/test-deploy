"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnauthorizedError = void 0;

var _exposableError = require("./exposable-error");

class UnauthorizedError extends _exposableError.ExposableError {
  constructor() {
    super("Unauthorized", 401);
  }

}

exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=unauthorized-error.js.map