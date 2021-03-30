"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = void 0;

var models = _interopRequireWildcard(require("~/models"));

const remove = params => models.mentors.remove(params);

exports.remove = remove;
//# sourceMappingURL=remove.js.map