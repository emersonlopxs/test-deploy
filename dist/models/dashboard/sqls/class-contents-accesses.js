"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classContentsAccesses = void 0;
// eslint-disable-next-line camelcase
const classContentsAccesses = `
  select
    s.name as studentName
    , s.schoolName as schoolName
    , s.city as cityName
    , s.state as stateName
    , a.env
    , a.screenName
    , a.hitted as timestamp
    , a.classId
    , c.title as classTitle
    , c.classType
    , c.subjectId
    , subjects.name as subjectName
    , c.themeId
    , themes.name as themeName
    , c.workshopId
    , workshops.name as workshopName

  from accesses as a

  join students as s on s.userId = a.userId
  join classes as c on c.id = a.classId
  left join subjects on subjects.id = c.subjectId
  left join themes on themes.id = c.themeId
  left join workshops on workshops.id = c.workshopId

  where a.hitted between ? and ?
  and a.roleId = 2
  order by 1
`;
exports.classContentsAccesses = classContentsAccesses;
//# sourceMappingURL=class-contents-accesses.js.map