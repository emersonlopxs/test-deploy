"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = void 0;

var db = _interopRequireWildcard(require("~/core/database"));

const get = ({
  id
}) => db.first(`
      select
        id,
        name,
        color,
        description
      from classTypes
      where id = ${id}
    `);

exports.get = get;
//# sourceMappingURL=get.js.map