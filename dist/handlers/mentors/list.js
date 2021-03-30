"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = void 0;

var models = _interopRequireWildcard(require("~/models"));

const list = params => models.mentors.list(params);

exports.list = list;
//# sourceMappingURL=list.js.map