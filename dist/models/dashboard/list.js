"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = void 0;

var sqls = _interopRequireWildcard(require("./sqls"));

var _database = require("~/core/database");

const list = async params => {
  let {
    from,
    to
  } = params;
  if (!from) from = new Date(2000, 1, 1);
  if (!to) to = new Date(3000, 1, 1);
  const dashboardSqls = JSON.parse(JSON.stringify(sqls));
  const ret = await Promise.all(Object.keys(sqls).map(async value => {
    return {
      title: value,
      value: (await (0, _database.first)(`
              select count(1) as count
              from (
                ${dashboardSqls[value]}
              ) as totalRowsCount
            `, [from, to])).count
    };
  }));
  return ret;
};

exports.list = list;
//# sourceMappingURL=list.js.map