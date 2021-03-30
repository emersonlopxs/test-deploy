"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = void 0;

var _database = require("~/core/database");

const list = async ({
  query,
  limit = 10,
  offset = 0
}) => {
  let sql;
  let sqlTotal;
  let params;
  const selectSQL = `
    select
      userId
      , userName
      , roleName
      , screenName
      , env
      , hitted
  `;
  const fromSQL = `
    from accesses
  `;

  if (query) {
    sql = `
      ${selectSQL}
      ${fromSQL}
      where userName like ?
      order by id
      limit ? offset ?
    `;
    sqlTotal = `
      select count(*) as count
      ${fromSQL}
      where userName like ?
    `;
    params = [(0, _database.like)(query), Number(limit), Number(offset)];
  } else {
    sql = `
      ${selectSQL}
      ${fromSQL}
      order by id
      limit ? offset ?
    `;
    params = [Number(limit), Number(offset)];
    sqlTotal = `
      select count(*) as count
      ${fromSQL}
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