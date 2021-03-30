"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insert = void 0;

var db = _interopRequireWildcard(require("~/core/database"));

const insert = async ({
  userId,
  userName,
  roleId,
  roleName,
  screenName,
  classId,
  classType,
  env
}) => db.insert(`
    insert into accesses(userId, userName, roleId, roleName, screenName, classId, classType, env, hitted)
    values (?, ?, ?, ?, ?, ?, ?, ?, now())
  `, [userId, userName, roleId, roleName, screenName, classId, classType, env]);

exports.insert = insert;
//# sourceMappingURL=insert.js.map