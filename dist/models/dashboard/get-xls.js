"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getXls = void 0;

var _csvStringify = _interopRequireDefault(require("csv-stringify"));

var _database = require("~/core/database");

var sqls = _interopRequireWildcard(require("./sqls"));

const getXls = async (params, res) => {
  const {
    name
  } = params;
  let {
    from,
    to
  } = params;
  if (!from) from = new Date(2000, 1, 1);
  if (!to) to = new Date(3000, 1, 1);
  const stringifier = (0, _csvStringify.default)();
  stringifier.options.header = true;
  const sql = JSON.parse(JSON.stringify(sqls))[name];
  return (0, _database.pipe)(sql, [from, to], stringifier, res);
};

exports.getXls = getXls;
//# sourceMappingURL=get-xls.js.map