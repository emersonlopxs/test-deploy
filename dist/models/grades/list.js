"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = void 0;

var _database = require("~/core/database");

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
    params = [(0, _database.like)(query), Number(limit), Number(offset)];
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

  const [rows, {
    count: total
  }] = await Promise.all([(0, _database.select)(sql, params), (0, _database.first)(sqlTotal, params)]);
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