"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insert = void 0;

var db = _interopRequireWildcard(require("~/core/database"));

const insert = ({
  name,
  color,
  description
}) => db.insert(`
      insert into classTypes(name, color, description, createdAt, modifiedAt)
      values(?, ?, ?, now(), now())
    `, [name, color, description]);

exports.insert = insert;
//# sourceMappingURL=insert.js.map