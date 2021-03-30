"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listSubjects = void 0;

var models = _interopRequireWildcard(require("~/models"));

const listSubjects = params => models.classTypes.listSubjects(params);

exports.listSubjects = listSubjects;
//# sourceMappingURL=list-subjects.js.map