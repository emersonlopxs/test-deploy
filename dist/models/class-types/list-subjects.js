"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listSubjects = void 0;

var _database = require("~/core/database");

const listSubjects = async ({
  classTypeId,
  siteIds,
  keyword,
  limit = 10,
  offset = 0
}) => {
  const rows = await (0, _database.select)(`
    select
      S.id,
      S.name,
      S.color,
      S.description,
      (select count(*) as count
    from classesSubjects as CS
    where CS.subjectId = S.id) as classQuantity
    from subjects as S
    where classTypeId = ?
      ${siteIds ? `AND S.siteId in (${siteIds.join()})` : ""}
      ${keyword ? `AND S.name like ${(0, _database.like)(keyword)}` : ""}
      AND (select count(*) as count
      from classesSubjects as CS
      where CS.subjectId = S.id) > 0
    order by S.modified_at desc
    limit ? offset ?
    `, [classTypeId, limit, offset]);
  const {
    count: total
  } = await (0, _database.first)(`
    select count(*) as count
    from subjects as S
    where classTypeId = ?
      ${siteIds ? `AND S.siteId in (${siteIds.join()})` : ""}
      ${keyword ? `AND S.name like ${(0, _database.like)(keyword)}` : ""}
      AND (select count(*) as count
      from classesSubjects as CS
      where CS.subjectId = S.id) > 0
    `, [classTypeId]);
  return {
    limit,
    offset,
    total,
    rows
  };
};

exports.listSubjects = listSubjects;
//# sourceMappingURL=list-subjects.js.map