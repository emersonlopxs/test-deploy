"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = void 0;

var models = _interopRequireWildcard(require("~/models"));

const update = params => models.grades.update(params);

exports.update = update;
//# sourceMappingURL=update.js.map