"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = void 0;

var db = _interopRequireWildcard(require("~/core/database"));

const list = data => db.select(`
    select *
    from debug.reqres
    where 1 = 1
    ${data.project ? `and project like ${db.like(data.project)}` : ""}
    ${data.package ? `and package like ${db.like(data.package)}` : ""}
    ${data.enviroment ? `and enviroment like ${db.like(data.enviroment)}` : ""}
    ${data.ip ? `and ip like ${db.like(data.ip)}` : ""}
    ${data.method ? `and method like ${db.like(data.method)}` : ""}
    ${data.path ? `and path like ${db.like(data.path)}` : ""}
    ${data.reqheaders ? `and reqheaders like ${db.like(data.reqheaders)}` : ""}
    ${data.reqbody ? `and reqbody like ${db.like(data.reqbody)}` : ""}
    ${data.status ? `and status = ${db.like(data.status)}` : ""}
    ${data.statusText ? `and statusText like ${db.like(data.statusText)}` : ""}
    ${data.resheaders ? `and resheaders like ${db.like(data.resheaders)}` : ""}
    ${data.resbody ? `and resbody like ${db.like(data.resbody)}` : ""}
    ${data.envvars ? `and envvars like ${db.like(data.envvars)}` : ""}
    ${data.extra ? `and extra like ${db.like(data.extra)}` : ""}
    order by id desc
    limit ${data.limit || 10} offset ${data.offset || 0}
`, []);

exports.list = list;
//# sourceMappingURL=list.js.map