"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = void 0;

var db = _interopRequireWildcard(require("~/core/database"));

const update = ({
  id,
  name
}) => db.update(`
      update grades SET
      name = coalesce(?, name)
      where id = ?
    `, [name, id]);

exports.update = update;
//# sourceMappingURL=update.js.map