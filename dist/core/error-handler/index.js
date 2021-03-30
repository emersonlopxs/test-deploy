"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = void 0;

var errorsMutators = _interopRequireWildcard(require("./erros-mutators"));

var _genericErrorHandler = require("./generic-error-handler");

const errorHandler = [...Object.values(errorsMutators), _genericErrorHandler.genericErrorHandler];
exports.errorHandler = errorHandler;
//# sourceMappingURL=index.js.map