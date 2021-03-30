"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertErrors = void 0;

var models = _interopRequireWildcard(require("~/models"));

const insertErrors = params => models.errors.insert(params);

exports.insertErrors = insertErrors;
//# sourceMappingURL=insert-errors.js.map