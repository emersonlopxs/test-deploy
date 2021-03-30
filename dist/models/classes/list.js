"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = void 0;

var _database = require("~/core/database");

const list = async ({
  subjectIds,
  classIds,
  keyword,
  limit = 10,
  offset = 0
}) => {
  const rows = await (0, _database.select)(`
    select
      C.id,
      C.title,
      CT.name as classType,
      CC.description,
      CC.thumbnail,
      CC.url
    from classesSubjects as CS
    join classes as C on C.id = CS.classId
    join subjects as S on S.id = CS.subjectId
    join classTypes as CT on CT.id = S.classTypeId
    join classesContents as CC on CC.classId = C.id
    where 1 = 1
      ${subjectIds ? `AND CS.subjectId in (${subjectIds.join()})` : ""}
      ${classIds ? `AND C.id in (${classIds.join()})` : ""}
      ${keyword ? `AND C.title like ${(0, _database.like)(keyword)}` : ""}
    group by C.id
    order by C.modified_at desc
    limit ? offset ?
    `, [limit, offset]);
  const {
    count: total
  } = await (0, _database.first)(`
    select
      count(distinct C.id) as count
    from classesSubjects as CS
    join classes as C on C.id = CS.classId
    join subjects as S on S.id = CS.subjectId
    join classTypes as CT on CT.id = S.classTypeId
    join classesContents as CC on CC.classId = C.id
    where 1 = 1
      ${subjectIds ? `AND CS.subjectId in (${subjectIds.join()})` : ""}
      ${classIds ? `AND C.id in (${classIds.join()})` : ""}
      ${keyword ? `AND C.title like ${(0, _database.like)(keyword)}` : ""}
    `);
  return {
    limit,
    offset,
    filters: {
      subjectIds,
      keyword,
      classIds
    },
    total,
    rows
  };
};

exports.list = list;
//# sourceMappingURL=list.js.map