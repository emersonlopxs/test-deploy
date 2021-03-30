"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertAccesses = void 0;

var models = _interopRequireWildcard(require("~/models"));

const insertAccesses = params => models.accesses.insert(params);

exports.insertAccesses = insertAccesses;
//# sourceMappingURL=insert-accesses.js.map