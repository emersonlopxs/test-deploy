"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.teacherAccesses = void 0;
// eslint-disable-next-line camelcase
const teacherAccesses = `
  select
    t.name as teacherName
    , t.workSchoolName as schoolName
    , t.city as cityName
    , t.state as stateName
    , a.env
    , a.screenName
    , a.hitted as timestamp

  from accesses as a

  join teachers as t on t.userId = a.userId

  where a.hitted between ? and ?
  and a.roleId = 1
  order by 1
`;
exports.teacherAccesses = teacherAccesses;
//# sourceMappingURL=teacher-accesses.js.map