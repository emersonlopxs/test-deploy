"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insert = void 0;

var _database = require("~/core/database");

var _config = require("~/core/config");

var helpers = _interopRequireWildcard(require("~/helpers"));

var sqls = _interopRequireWildcard(require("./sqls"));

const insert = ({
  email,
  password,
  name,
  token
}) => (0, _database.beginTransaction)(async trans => {
  const userId = await trans.insert(`
        insert into users(username, password, token, createdAt, modifiedAt)
        values(?, ?, ?, now(), now())
      `, [email, await helpers.password.hash(password || _config.DEFAULT_PASSWORD), token]);
  await trans.insert(`
        insert into admin(
          userId
          , name
          , createdAt
          , modifiedAt
        ) values(
          ?
          , ?
          , now()
          , now()
        )
      `, [userId, name]);
  return Promise.all([trans.insert(`
          insert into usersRoles(roleId, userId, createdAt, modifiedAt)
          values((select id from roles where alias = ?), ?, now(), now())
        `, ["admin", userId]), trans.select(`
            ${sqls.select}
            ${sqls.from}
            where U.id = ?
          `, [userId])]).then(results => results.pop());
});

exports.insert = insert;
//# sourceMappingURL=insert.js.map