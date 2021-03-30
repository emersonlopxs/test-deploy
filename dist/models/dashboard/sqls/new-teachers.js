"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newTeachers = void 0;
// eslint-disable-next-line camelcase
const newTeachers = `
  select
    t.name as teacherName
    , t.workSchoolName as schoolName
    , t.city as cityName
    , t.state as stateName
    , t.createdAt

  from teachers as t

  where t.createdAt between ? and ?
  order by 1
`;
exports.newTeachers = newTeachers;
//# sourceMappingURL=new-teachers.js.map