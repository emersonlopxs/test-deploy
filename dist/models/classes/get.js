"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = void 0;

var _database = require("~/core/database");

const get = ({
  id
}) => (0, _database.select)(`
    select
      c.id as classId
      , c.subjectId
      , c.title as classTitle
      , c.gradeId gradeId
      , c.classType as classType
      , c.themeId as themeId
      , c.workshopId as workshopId
      , h.name as themeName
      , w.name as workshopName
      , s.name as subjectName
      , cc.description as contentDescription
      , cc.id as contentId
      , cc.url as contentUrl
      , cc.type as contentType
      , cc.thumbnail as contentThumbnail
      , t.id as teacherId
      , t.userId as teacherUserId
      , t.name as teacherName
    from classes as c
    inner join classesContents as cc on cc.classId = c.id
    left join subjects as s on s.id = c.subjectId
    left join teachers as t on t.userId = c.userId
    left join themes as h on h.id = c.themeId
    left join workshops as w on w.id = c.workshopId
    where c.id = ?
  `, [id]);

exports.get = get;
//# sourceMappingURL=get.js.map