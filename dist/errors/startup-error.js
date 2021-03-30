"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StartupError = void 0;

var _errorWithCode = require("./error-with-code");

class StartupError extends _errorWithCode.ErrorWithCode {
  constructor(message) {
    super(message);
    this.code = "ERR_STARTUP_ERROR";
  }

}

exports.StartupError = StartupError;
//# sourceMappingURL=startup-error.js.map