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
  classTypeId,
  siteId,
  description
}) => db.insert(`
      insert into subjects(name, color, description, classTypeId, siteId, createdAt, modifiedAt)
      values(?, ?, ?, ?, ?, now(), now())
    `, [name, color, description, classTypeId, siteId]);

exports.insert = insert;
//# sourceMappingURL=insert.js.map