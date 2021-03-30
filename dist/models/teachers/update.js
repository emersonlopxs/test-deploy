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
  name,
  password,
  siteId,
  subjects,
  city,
  state,
  graduationUniversityName,
  graduationYear,
  workSchoolName,
  ddd,
  telephone,
  enabled
}) => {
  if (password) await db.update(`
        update users SET password = ? where id = ?
      `, [await helpers.password.hash(password), id]);
  await db.update(`
    update teachers SET
      name = coalesce(?, name)
      , siteId = coalesce(?, siteId)
      , city = coalesce(?, city)
      , state = coalesce(?, state)
      , graduationUniversityName = coalesce(?, graduationUniversityName)
      , graduationYear = coalesce(?, graduationYear)
      , workSchoolName = coalesce(?, workSchoolName)
      , ddd = coalesce(?, ddd)
      , telephone = coalesce(?, telephone)
      , enabled = coalesce(?, enabled)
    where userId = ?
    `, [name, siteId, city, state, graduationUniversityName, graduationYear, workSchoolName, ddd, telephone, enabled, id]);

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