"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = void 0;

var db = _interopRequireWildcard(require("~/core/database"));

var helpers = _interopRequireWildcard(require("~/helpers"));

const update = async ({
  id,
  city,
  password,
  name,
  state,
  gradeId,
  isPublicSchool,
  schoolName,
  siteId,
  classTypes,
  subjects
}) => {
  if (password) await db.update(`
          update users SET password = ? where id = ?
        `, [await helpers.password.hash(password), id]);
  await db.update(`
        update students SET
          city = coalesce(?, city)
          , name = coalesce(?, name)
          , state = coalesce(?, state)
          , gradeId = coalesce(?, gradeId)
          , isPublicSchool = coalesce(?, isPublicSchool)
          , schoolName = coalesce(?, schoolName)
          , siteId = coalesce(?, siteId)
          , createdAt = now()
          , modifiedAt = now()
        where userId = ?
      `, [city, name, state, gradeId, isPublicSchool, schoolName, siteId, id]);

  if (classTypes) {
    await db.remove(`
          delete from userClasses
          where userId = ?
          AND classTypeId
        `, id);
    classTypes.map(async classTypeId => {
      await db.insert(`
          insert into userClasses (userId, classTypeId, createdAt, modifiedAt)
          values (?, ?, now(), now())
        `, [id, classTypeId]);
    });
  }

  if (subjects) {
    await db.remove(`
        delete from userClasses
        where userId = ?
        AND subjectId
      `, id);
    subjects.map(async subjectId => {
      await db.insert(`
          insert into userClasses (userId, subjectId, createdAt, modifiedAt)
          values (?, ?, now(), now())
        `, [id, subjectId]);
    });
  }
};

exports.update = update;
//# sourceMappingURL=update.js.map