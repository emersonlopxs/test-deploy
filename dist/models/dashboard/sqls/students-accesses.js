"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.studentsAccesses = void 0;
// eslint-disable-next-line camelcase
const studentsAccesses = `
  select
    s.name as studentName
    , s.schoolName as schoolName
    , s.city as cityName
    , s.state as stateName
    , a.env
    , a.screenName
    , a.hitted as timestamp

  from accesses as a

  join students as s on s.userId = a.userId

  where a.hitted between ? and ?
  and a.roleId = 2
  order by 1
`;
exports.studentsAccesses = studentsAccesses;
//# sourceMappingURL=students-accesses.js.map