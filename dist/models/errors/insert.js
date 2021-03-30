"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insert = void 0;

var db = _interopRequireWildcard(require("~/core/database"));

const insert = data => db.insert(`
    insert into debug.errors (
      project,
      package,
      enviroment,
      module,
      file,
      message,
      stack,
      error,
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
      status,
      statusText,
      resheaders,
      resbody,
      sqltext,
      envvars,
      extra
    ) values (
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?
    )
`, [data.project, data.package, data.enviroment, data.module, data.file, data.message, data.stack, data.error, data.ip, data.protocol, data.method, data.path, data.route, data.authorization, data.reqheaders, data.reqparams, data.reqbody, data.reqquery, data.status, data.statusText, data.resheaders, data.resbody, data.sqltext, data.envvars, data.extra]);

exports.insert = insert;
//# sourceMappingURL=insert.js.map