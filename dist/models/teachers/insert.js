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
  name,
  email,
  siteId,
  subjects = [],
  graduationUniversityName,
  graduationYear,
  workSchoolName,
  state,
  city,
  cpf,
  ddd,
  telephone,
  enabled,
  token,
  password
}) => (0, _database.beginTransaction)(async trans => {
  const userId = await trans.insert(`
        insert into users(username, password, token, createdAt, modifiedAt)
        values(?, ?, ?, now(), now())
      `, [email, await helpers.password.hash(password || _config.DEFAULT_PASSWORD), token]);
  await trans.insert(`
        insert into teachers(
          userId
          , name
          , siteId
          , graduationYear
          , graduationUniversityName
          , workSchoolName
          , state
          , city
          , cpf
          , ddd
          , telephone
          , enabled
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
          , ?
          , now()
          , now()
        )
      `, [userId, name, siteId, graduationYear, graduationUniversityName, workSchoolName, state, city, cpf, ddd, telephone, enabled]);
  await Promise.all([trans.insert(`
          insert into usersRoles(roleId, userId, createdAt, modifiedAt)
          values((select id from roles where alias = ?), ?, now(), now())
        `, ["teacher", userId]), ...subjects.map(async subjectId => {
    trans.insert(`
            insert into userClasses (userId, subjectId, createdAt, modifiedAt)
            values (?, ?, now(), now())
          `, [userId, subjectId]);
  })]);
});

exports.insert = insert;
//# sourceMappingURL=insert.js.map