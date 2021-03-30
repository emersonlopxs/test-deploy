"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = void 0;

var _database = require("~/core/database");

const remove = ({
  id
}) => {
  return (0, _database.beginTransaction)(async trans => {
    await trans.remove("delete from notifications where userId = ?", [id]);
    await trans.remove("delete from usersRoles where userId = ?", [id]);
    await trans.remove(`
        delete from userClasses
        where userId = ?
      `, [id]);
    await trans.remove("delete from teachers where userId = ?", [id]);
    await trans.remove("delete from users where id = ?", [id]);
  });
};

exports.remove = remove;
//# sourceMappingURL=remove.js.map