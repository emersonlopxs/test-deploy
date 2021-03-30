"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changePassword = void 0;

var models = _interopRequireWildcard(require("~/models"));

var helpers = _interopRequireWildcard(require("~/helpers"));

const changePassword = async ({
  username,
  currentPassword,
  newPassword
}) => {
  const user = await models.users.getCredentialsInfo(username);
  await helpers.password.verify(currentPassword, user.password);
  const hashed = await helpers.password.hash(newPassword);
  await models.users.updatePassword(username, hashed);
};

exports.changePassword = changePassword;
//# sourceMappingURL=change-password.js.map