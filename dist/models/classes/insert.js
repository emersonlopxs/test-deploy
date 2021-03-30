"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insert = void 0;

var _database = require("~/core/database");

const insert = ({
  title,
  contents,
  subjectIds,
  classes,
  gradeId,
  tagsId
}, userId) => (0, _database.beginTransaction)(async trans => {
  const classId = await trans.insert(`
      insert into classes(
        userId
        , gradeId
        , title
        , createdAt
        , modifiedAt
      )
      values(
        ?
        , ?
        , ?
        , now()
        , now()
      )
      `, [userId, gradeId, title]);
  subjectIds.map(async (subjectId) => Promise.all(trans.insert(`
          insert into classesSubjects(
            classId
            , subjectId
            , createdAt
            , modifiedAt
          )
          values(
            ?
            , ?
            , now()
            , now()
          )
        `, [classId, subjectId]), trans.update(`
          update subjects set modifiedAt = now() where id = ?
          `, [subjectId])));

  if (contents) {
    contents.map(async (content) => trans.insert(`
          insert into classesContents(
            classId
            , description
            , thumbnail
            , type
            , url
            , isMain
            , createdAt
            , modifiedAt
          )
          values(
            ?
            , ?
            , ?
            , ?
            , ?
            , ?
            , now()
            , now()
          )
          `, [classId.toString(), content.description, content.thumbnail, content.type, content.url, content.isMain]));
  }

  if (classes) {
    classes.map(async (childClassId) => trans.insert(`
            insert into classesClasses(
              parentClassId
              , childClassId
              , createdAt
              , modifiedAt
            )
            values(
              ?
              , ?
              , now()
              , now()
            )
          `, [classId, childClassId]));
  }

  if (tagsId) {
    tagsId.map(async (tagId) => trans.insert(`
            insert into classesTags(
              classId
              , tagId
              , createdAt
              , modifiedAt
            )
            values(
              ?
              , ?
              , now()
              , now()
            )
          `, [classId, tagId]));
  }

  return classId;
});

exports.insert = insert;
//# sourceMappingURL=insert.js.map