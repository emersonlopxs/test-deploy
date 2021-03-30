"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newStudents = void 0;
// eslint-disable-next-line camelcase
const newStudents = `
  select
    s.name as studentName
    , s.schoolName as schoolName
    , s.city as cityName
    , s.state as stateName
    , s.createdAt

  from students as s

  where s.createdAt between ? and ?
  order by 1
`;
exports.newStudents = newStudents;
//# sourceMappingURL=new-students.js.map