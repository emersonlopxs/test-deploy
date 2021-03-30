"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insert = void 0;

var db = _interopRequireWildcard(require("~/core/database"));

const insert = data => db.insert(`
    insert into debug.reqres (
      project
      , package
      , enviroment
      , ip
      , protocol
      , method
      , path
      , route
      , authorization
      , reqheaders
      , reqparams
      , reqbody
      , reqquery
      , status
      , statusText
      , resheaders
      , resbody
      , envvars
      , error
      , errorId
      , extra
    ) select
    ${db.escape(data.project)} as project
    , ${db.escape(data.package)} as package
    , ${db.escape(data.enviroment)} as enviroment
    , ${db.escape(data.ip)} as ip
    , ${db.escape(data.protocol)} as protocol
    , ${db.escape(data.method)} as method
    , ${db.escape(data.path)} as path
    , ${db.escape(JSON.stringify(data.route, null, 2))} as route
    , ${db.escape(data.authorization)} as authorization
    , ${db.escape(JSON.stringify(data.reqheaders, null, 2))} as reqheaders
    , ${db.escape(JSON.stringify(data.reqparams, null, 2))} as reqparams
    , ${db.escape(JSON.stringify(data.reqbody, null, 2))} as reqbody
    , ${db.escape(JSON.stringify(data.reqquery, null, 2))} as reqquery
    , ${db.escape(data.status)} as status
    , ${db.escape(data.statusText)} as statusText
    , ${db.escape(JSON.stringify(data.resheaders, null, 2))} as resheaders
    , ${db.escape(JSON.stringify(data.resbody, null, 2))} as resbody
    , ${db.escape(JSON.stringify(data.envvars, null, 2))} as envvars
    , ${db.escape(JSON.stringify(data.error, null, 2))} as error
    , ${db.escape(data.errorId)} as errorId
    , ${db.escape(JSON.stringify(data.extra, null, 2))} as extra
`);

exports.insert = insert;
//# sourceMappingURL=insert.js.map