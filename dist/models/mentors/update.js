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
}) => (0, _database.beginTransaction)(trans => Promise.all([async () => {
  if (password) trans.update(`
              update users SET password = ? where id = ?
            `, [await helpers.password.hash(password), userId]);
}, trans.update(`
          update mentors
            set name = ?
            , modifiedAt = now()
          where userId = ?
        `, [name, userId])]));

exports.update = update;
//# sourceMappingURL=update.js.map