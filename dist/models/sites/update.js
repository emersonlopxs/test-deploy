"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = void 0;

var db = _interopRequireWildcard(require("~/core/database"));

const update = ({
  id,
  name,
  siteCode,
  city,
  state
}) => db.update(`
    update sites
    set
      name = coalesce(?, name)
      , siteCode = coalesce(?, siteCode)
      , city  = coalesce(?, city)
      , state = coalesce(?, state)
    where id = ?
  `, [name, siteCode, city, state, id]);

exports.update = update;
//# sourceMappingURL=update.js.map