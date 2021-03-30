"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insert = void 0;

var db = _interopRequireWildcard(require("~/core/database"));

const insert = ({
  name
}) => db.insert(`
      insert into tags(name, createdAt, modifiedAt)
      values(?, now(), now())
    `, [name]);

exports.insert = insert;
//# sourceMappingURL=insert.js.map