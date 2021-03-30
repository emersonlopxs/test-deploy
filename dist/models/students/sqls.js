"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classTypes = exports.subjects = exports.from = exports.select = void 0;
const select = `
  select
    S.id,
    S.userId,
    S.gradeId,
    S.isPublicSchool,
    S.schoolName,
    S.state,
    S.city,
    S.name,
    S.cpf,
    S.siteId,
    S.createdAt,
    S.modifiedAt,
    U.username,
    S.birthDate,
    S.gender
`;
exports.select = select;
const from = `
  from students S
  join users U on U.id = S.userId
`;
exports.from = from;
const subjects = `
  select
    S.id,
    S.name
  from userClasses as UC
    join subjects as S on S.id = UC.subjectId
  where UC.userId = ? and UC.subjectId
  order by S.id
`;
exports.subjects = subjects;
const classTypes = `
  select
    CT.id,
    CT.name
  from userClasses as UC
    join classTypes as CT on CT.id = UC.classTypeId
  where UC.userId = ? and UC.classTypeId
  order by CT.id
`;
exports.classTypes = classTypes;
//# sourceMappingURL=sqls.js.map