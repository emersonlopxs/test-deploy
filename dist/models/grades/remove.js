"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = void 0;

var db = _interopRequireWildcard(require("~/core/database"));

const remove = async ({
  id
}) => db.remove("delete from grades where id = ?", [id]);

exports.remove = remove;
//# sourceMappingURL=remove.js.map