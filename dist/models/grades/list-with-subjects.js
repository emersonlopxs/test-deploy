"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listWithSubjects = void 0;

var _database = require("~/core/database");

const listWithSubjects = async ({
  query,
  limit = 10,
  offset = 0
}) => {
  const sql = `
    select
      sg.gradeId
      , sg.subjectId
      , g.name as gradeName
      , s.name as subjectName
      , s.color as subjectColor
    from subjectsGrades as sg
    inner join grades as g on g.id = sg.gradeId
    inner join subjects as s on s.id = sg.subjectId
    where 1 = 1
    ${query ? `and ( g.name like ${(0, _database.like)(query)} or s.name like ${(0, _database.like)(query)} )` : ""}
  `;
  const sqlTotal = `select count(*) as total from (${sql}) as t`;
  const [rows, [{
    total
  }]] = await Promise.all([(0, _database.select)(sql), (0, _database.select)(sqlTotal)]);
  return {
    query,
    limit,
    offset,
    total,
    rows
  };
};

exports.listWithSubjects = listWithSubjects;
//# sourceMappingURL=list-with-subjects.js.map