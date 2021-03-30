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
  let sql = `
    ${sqls.select}
    ${sqls.from}
  `;
  sql += `
  order by name
  limit ${limit} offset ${offset}
  `;
  let sqlTotal = `
  select count(*) as count
  ${sqls.from}
  `;

  if (query) {
    sql += `where name like ${(0, _database.like)(query)}`;
    sqlTotal += `where name like ${(0, _database.like)(query)}`;
  }

  const [rows, {
    count: total
  }] = await Promise.all([(0, _database.select)(sql), (0, _database.first)(sqlTotal)]);
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