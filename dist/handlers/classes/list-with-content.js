"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listWithContent = void 0;

var models = _interopRequireWildcard(require("~/models"));

const listWithContent = async (params, auth) => {
  if (auth.role === "student") {
    return models.classes.listWithContent.student(params, auth.id);
  }

  if (auth.role === "teacher") {
    return models.classes.listWithContent.teacher(params, auth.id);
  }

  return models.classes.listWithContent.teacher(params, auth.id);
};

exports.listWithContent = listWithContent;
//# sourceMappingURL=list-with-content.js.map