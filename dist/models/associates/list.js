"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = void 0;

var db = _interopRequireWildcard(require("~/core/database"));

const list = async ({
  query,
  limit = 10,
  offset = 0
}) => {
  const rows = await db.select(`
    select
      id,
      name,
      color,
      description,
      button as button_text,
      image_link,
      link
    from associates
    limit ? offset ?
    `, [limit, offset]);
  const {
    count: total
  } = await db.first(`
    select
      count(*) as count
    from associates
    `, [limit, offset]);
  return {
    query,
    limit,
    offset,
    total,
    rows
  };
};

exports.list = list;
//# sourceMappingURL=list.js.map