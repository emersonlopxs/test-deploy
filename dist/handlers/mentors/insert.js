"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insert = void 0;

var models = _interopRequireWildcard(require("~/models"));

const insert = params => models.mentors.insert(params);

exports.insert = insert;
//# sourceMappingURL=insert.js.map