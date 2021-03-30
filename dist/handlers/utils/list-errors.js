"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listErrors = void 0;

var models = _interopRequireWildcard(require("~/models"));

const listErrors = params => models.errors.list(params);

exports.listErrors = listErrors;
//# sourceMappingURL=list-errors.js.map