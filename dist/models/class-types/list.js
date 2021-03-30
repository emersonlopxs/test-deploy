"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = void 0;

var _database = require("~/core/database");

const list = async ({
  query,
  classTypeIds,
  limit = 10,
  offset = 0
}) => {
  const rows = await (0, _database.select)(`
    select
      id,
      name,
      color,
      description
    from classTypes
    where 1 = 1
    ${query ? `and name like ${(0, _database.like)(query)}` : ""}
    ${classTypeIds ? `AND id in (${classTypeIds.join()})` : ""}
    limit ? offset ?
    `, [limit, offset]);
  const {
    count: total
  } = await (0, _database.first)(`
    select
      count(*) as count
    from classTypes
    where 1 = 1
    ${query ? `and name like ${(0, _database.like)(query)}` : ""}
    ${classTypeIds ? `AND id in (${classTypeIds.join()})` : ""}
    `);
  return {
    limit,
    offset,
    filters: {
      query,
      classTypeIds
    },
    total,
    rows
  };
};

exports.list = list;
//# sourceMappingURL=list.js.map