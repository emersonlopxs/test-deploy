"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPassword = void 0;

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

var models = _interopRequireWildcard(require("~/models"));

var helpers = _interopRequireWildcard(require("~/helpers"));

var _config = require("~/core/config");

_mail.default.setApiKey(_config.SENDGRID_KEY);

const sendMail = (email, password) => _mail.default.send({
  from: _config.SENDGRID_FROM,
  html: `Aqui está a sua nova senha para acessar o aplicativo da gerando falcões: <b>${password}<b>`,
  subject: _config.SENDGRID_SUBJECT_RESET_PASSWORD,
  text: `Aqui está a sua nova senha para acessar o aplicativo da gerando falcões: ${password}`,
  to: email
});

const resetPassword = async ({
  email
}) => {
  const randomPassword = Math.random().toString(36).slice(-8);
  const encryptedPassword = await helpers.password.hash(randomPassword);
  await models.users.updatePassword(email, encryptedPassword);
  await sendMail(email, randomPassword);
  return {};
};

exports.resetPassword = resetPassword;
//# sourceMappingURL=reset-password.js.map