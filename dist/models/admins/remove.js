"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = void 0;

var _database = require("~/core/database");

const remove = ({
  userId
}) => {
  return (0, _database.beginTransaction)(async trans => {
    await trans.remove("delete from notifications where userId = ?", [userId]);
    await trans.remove("delete from usersRoles where userId = ?", [userId]);
    await trans.remove("delete from admin where userId = ?", [userId]);
    await trans.remove("delete from users where id = ?", [userId]);
  });
};

exports.remove = remove;
//# sourceMappingURL=remove.js.map