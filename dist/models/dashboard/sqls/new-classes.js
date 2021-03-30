"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newClasses = void 0;
// eslint-disable-next-line camelcase
const newClasses = `
  select
    t.name as teacherName
    , c.id as classId
    , c.title as classTitle
    , c.classType
    , c.createdAt
    , c.subjectId
    , subjects.name as subjectName
    , c.themeId
    , themes.name as themeName
    , c.workshopId
    , workshops.name as workshopName

  from classes as c

  join teachers as t on t.userId = c.userId
  left join subjects on subjects.id = c.subjectId
  left join themes on themes.id = c.themeId
  left join workshops on workshops.id = c.workshopId

  where c.createdAt between ? and ?
  order by t.name
`;
exports.newClasses = newClasses;
//# sourceMappingURL=new-classes.js.map