"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorWithCode = void 0;

class ErrorWithCode extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }

}

exports.ErrorWithCode = ErrorWithCode;
//# sourceMappingURL=error-with-code.js.map