"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subjects = exports.from = exports.select = void 0;
const select = `
  select
    T.id,
    T.userId,
    T.name,
    T.siteId,
    T.graduationYear,
    T.graduationUniversityName,
    T.workSchoolName,
    T.state,
    T.city,
    T.cpf,
    T.ddd,
    T.telephone,
    T.enabled,
    U.username,
    U.id
`;
exports.select = select;
const from = `
  from teachers T
  join users U on U.id = T.userId
`;
exports.from = from;
const subjects = `
  select
    S.id,
    S.name
  from teachers as T
  join userClasses as UC on UC.userId = T.userId
  join subjects as S on UC.subjectId = S.id
  where T.userId = ?
  order by S.id
`;
exports.subjects = subjects;
//# sourceMappingURL=sqls.js.map