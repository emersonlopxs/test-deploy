"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = void 0;

var db = _interopRequireWildcard(require("~/core/database"));

var sqls = _interopRequireWildcard(require("./sqls"));

const get = ({
  id
}) => db.first(`
      ${sqls.select}
      ${sqls.from}
      where id = ?
    `, [id]);

exports.get = get;
//# sourceMappingURL=get.js.map