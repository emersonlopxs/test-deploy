"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = void 0;

var db = _interopRequireWildcard(require("~/core/database"));

const remove = ({
  id
}) => db.remove("delete from classTypes where id = ?", [id]);

exports.remove = remove;
//# sourceMappingURL=remove.js.map