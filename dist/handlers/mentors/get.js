"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = void 0;

var models = _interopRequireWildcard(require("~/models"));

const get = params => models.mentors.get(params);

exports.get = get;
//# sourceMappingURL=get.js.map