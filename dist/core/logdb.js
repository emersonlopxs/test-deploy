"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logdb = logdb;

var models = _interopRequireWildcard(require("~/models"));

function logdb({
  ip,
  protocol,
  method,
  path,
  route,
  authorization,
  reqheaders,
  reqparams,
  reqbody,
  reqquery,
  statusCode,
  statusMessage,
  resheaders,
  resbody,
  enviroment,
  envvars,
  extra,
  error,
  errorId
}) {
  const status = statusCode;
  const statusText = statusMessage;
  models.reqres.insert({
    project: "gf",
    package: "back",
    enviroment,
    ip,
    path,
    status,
    statusText,
    envvars,
    extra,
    protocol,
    method,
    route,
    authorization,
    reqheaders,
    reqparams,
    reqbody,
    reqquery,
    resheaders,
    resbody,
    error,
    errorId
  });
}
//# sourceMappingURL=logdb.js.map