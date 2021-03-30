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

  if (query) {
    sql = `
      ${sqls.select}
      ${sqls.from}
      where name like ${(0, _database.like)(query)}
      order by name
      limit ? offset ?
    `;
    sqlTotal = `
      select count(*) as count
      ${sqls.from}
      where name like ?
    `;
  } else {
    sql = `
      ${sqls.select}
      ${sqls.from}
      where 1 = 1
      order by name
      limit ? offset ?
    `;
    sqlTotal = `
      select count(*) as count
      ${sqls.from}
      where 1 = 1
    `;
  }

  const rows = await (0, _database.select)(sql, [limit, offset]);
  const [{
    count: total
  }] = await Promise.all([(0, _database.first)(sqlTotal, [limit, offset]), ...rows.map(async ({
    userId
  }, index) => {
    rows[index].subjects = await (0, _database.select)(sqls.subjects, [userId]);
  })]);
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