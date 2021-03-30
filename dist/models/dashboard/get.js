"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = void 0;

var sqls = _interopRequireWildcard(require("./sqls"));

var _database = require("~/core/database");

const get = async params => {
  const {
    name
  } = params;
  let {
    from,
    to
  } = params;
  if (!from) from = new Date(2000, 1, 1);
  if (!to) to = new Date(3000, 1, 1);
  const sql = JSON.parse(JSON.stringify(sqls))[name];
  const res = await (0, _database.first)(sql, [from, to]);
  return res;
};

exports.get = get;
//# sourceMappingURL=get.js.map