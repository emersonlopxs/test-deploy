"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = void 0;

var models = _interopRequireWildcard(require("~/models"));

var helpers = _interopRequireWildcard(require("~/helpers"));

const login = async ({
  username,
  password
}) => {
  const user = await models.users.getCredentialsInfo(username);
  await helpers.password.verify(password, user.password);
  delete user.password;
  const roleDetails = await models.users.getRoleInfo(user.role, user.id);
  return helpers.jwt.sign(JSON.stringify({ ...user,
    ...roleDetails
  }));
};

exports.login = login;
//# sourceMappingURL=login.js.map