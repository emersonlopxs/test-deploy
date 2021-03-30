"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insert = void 0;

var _database = require("~/core/database");

var _config = require("~/core/config");

var helpers = _interopRequireWildcard(require("~/helpers"));

const insert = async ({
  city,
  cpf,
  email,
  password,
  name,
  state,
  gradeId,
  isPublicSchool,
  schoolName,
  siteId,
  birthDate,
  gender,
  classTypes,
  subjects,
  token
}) => (0, _database.beginTransaction)(async trans => {
  const userId = await trans.insert(`
        insert into users(username, password, token, createdAt, modifiedAt)
        values(?, ?, ?, now(), now())
      `, [email, await helpers.password.hash(password || _config.DEFAULT_PASSWORD), token]);
  await trans.insert(`
          insert into students(
            userId
            , gradeId
            , isPublicSchool
            , schoolName
            , state
            , city
            , name
            , cpf
            , siteId
            , birthDate
            , gender
            , createdAt
            , modifiedAt
          ) values(
            ?
            , ?
            , ?
            , ?
            , ?
            , ?
            , ?
            , ?
            , ?
            , ?
            , ?
            , now()
            , now()
          )
        `, [userId, gradeId, isPublicSchool, schoolName, state, city, name, cpf, siteId, birthDate, gender]);
  await Promise.all([trans.insert(`
          insert into usersRoles(roleId, userId, createdAt, modifiedAt)
          values((select id from roles where alias = ?), ?, now(), now())
        `, ["student", userId]), ...classTypes.map(async (classTypeId) => trans.insert(`
            insert into userClasses (userId, classTypeId, createdAt, modifiedAt)
            values (?, ?, now(), now())
          `, [userId, classTypeId])), ...subjects.map(async (subjectId) => trans.insert(`
            insert into userClasses (userId, subjectId, createdAt, modifiedAt)
            values (?, ?, now(), now())
          `, [userId, subjectId]))]);
});

exports.insert = insert;
//# sourceMappingURL=insert.js.map