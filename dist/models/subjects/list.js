"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = void 0;

var _database = require("~/core/database");

const list = async ({
  query,
  classTypeId,
  siteIds,
  limit = 10,
  offset = 0
}) => {
  const rows = await (0, _database.select)(`
    select
      id,
      name,
      description,
      siteId,
      color,
      classTypeId
    from subjects
    where 1 = 1
    ${query ? `and name like ${(0, _database.like)(query)}` : ""}
    ${classTypeId ? `and classTypeId = ${classTypeId}` : ""}
    ${siteIds ? `AND siteId in (${siteIds.join()})` : ""}
    order by modified_at desc
    limit ${limit} offset ${offset}
    `);
  const {
    count: total
  } = await (0, _database.first)(`
    select
      count(*) as count
    from subjects
    where 1 = 1
    ${query ? `and name like ${(0, _database.like)(query)}` : ""}
    ${classTypeId ? `and classTypeId = ${classTypeId}` : ""}
    ${siteIds ? `AND siteId in (${siteIds.join()})` : ""}
    `);
  return {
    limit,
    offset,
    filters: {
      query,
      classTypeId,
      siteIds
    },
    total,
    rows
  };
};

exports.list = list;
//# sourceMappingURL=list.js.map