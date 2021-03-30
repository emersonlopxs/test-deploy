"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = void 0;

var db = _interopRequireWildcard(require("~/core/database"));

const update = async ({
  id,
  name,
  color,
  description
}) => db.update(`
      update subjects SET
      name = coalesce(?, name)
      , color = coalesce(?, color)
      , description = coalesce(?, description)
      where id = ?
    `, [name, color, description, id]);

exports.update = update;
//# sourceMappingURL=update.js.map