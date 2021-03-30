"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = void 0;

var _database = require("~/core/database");

var helpers = _interopRequireWildcard(require("~/helpers"));

const update = async ({
  userId,
  name,
  password
}) => {
  await (0, _database.beginTransaction)(async trans => {
    if (password) {
      trans.update(`
          update users set password = ? where id = ?
        `, [await helpers.password.hash(password), userId]);
    }

    await trans.update(`
      update admin
        set name = ?,
        modifiedAt = now()
      where userId = ?
      `, [name, userId]);
  });
}; // async () => {
//   console.log("AAQQQQQQQUIIIIIIIIIIIIIIIIIIIIIIIIII");
//
// },


exports.update = update;
//# sourceMappingURL=update.js.map