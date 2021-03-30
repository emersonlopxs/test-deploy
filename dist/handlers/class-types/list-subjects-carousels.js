"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listSubjectsCarousels = void 0;

var models = _interopRequireWildcard(require("~/models"));

const listSubjectsCarousels = async (params, auth) => {
  if (auth.role === "student") {
    return models.classTypes.listCarousels.student(params, auth.id);
  }

  if (auth.role === "teacher") {
    return models.classTypes.listCarousels.teacher(params, auth.id);
  }

  return models.classTypes.listCarousels.teacher(params, auth.id);
};

exports.listSubjectsCarousels = listSubjectsCarousels;
//# sourceMappingURL=list-subjects-carousels.js.map