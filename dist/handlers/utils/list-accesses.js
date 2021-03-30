"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listAccesses = void 0;

var models = _interopRequireWildcard(require("~/models"));

const listAccesses = params => models.accesses.list(params);

exports.listAccesses = listAccesses;
//# sourceMappingURL=list-accesses.js.map