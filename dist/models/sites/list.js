"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = void 0;

var db = _interopRequireWildcard(require("~/core/database"));

var sqls = _interopRequireWildcard(require("./sqls"));

const list = async ({
  query,
  limit = 10,
  offset = 0
}) => {
  let sql;
  let sqlTotal;
  let params;

  if (query) {
    sql = `
        ${sqls.select}
        ${sqls.from}
        where name like ?
        order by name
        limit ? offset ?
      `;
    sqlTotal = `
        select count(*) as count
        ${sqls.from}
        where name like ?
      `;
    params = [`${db.like(query)}`, Number(limit), Number(offset)];
  } else {
    sql = `
        ${sqls.select}
        ${sqls.from}
        order by name
        limit ? offset ?
      `;
    params = [Number(limit), Number(offset)];
    sqlTotal = `
        select count(*) as count
        ${sqls.from}
      `;
  }

  const rows = await db.select(sql, params);
  const total = (await db.first(sqlTotal, params)).count;
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