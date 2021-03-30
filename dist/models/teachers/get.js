"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = void 0;

var _database = require("~/core/database");

var sqls = _interopRequireWildcard(require("./sqls"));

const get = async ({
  id
}) => Promise.all([(0, _database.first)(`
        ${sqls.select}
        ${sqls.from}
        where U.id = ?
      `, [id]), (0, _database.select)(sqls.subjects, [id])]).then(([teacher, subjects]) => ({ ...teacher,
  subjects
}));

exports.get = get;
//# sourceMappingURL=get.js.map