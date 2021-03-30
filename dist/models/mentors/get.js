"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = void 0;

var db = _interopRequireWildcard(require("~/core/database"));

var sqls = _interopRequireWildcard(require("./sqls"));

const get = async ({
  userId
}) => db.first(`
      ${sqls.select}
      ${sqls.from}
      where u.id = ?
    `, [userId]);

exports.get = get;
//# sourceMappingURL=get.js.map