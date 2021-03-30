"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.approve = void 0;

var models = _interopRequireWildcard(require("~/models"));

const approve = params => models.classes.approve(params);

exports.approve = approve;
//# sourceMappingURL=approve.js.map