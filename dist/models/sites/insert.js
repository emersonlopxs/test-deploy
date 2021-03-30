"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insert = void 0;

var db = _interopRequireWildcard(require("~/core/database"));

const insert = ({
  name,
  siteCode,
  city,
  state
}) => db.insert(`
      insert into sites(
        name
        , siteCode
        , city
        , state
        , createdAt
        , modifiedAt
      ) values (
        ?
        , ?
        , ?
        , ?
        , now()
        , now()
      )
    `, [name, siteCode, city, state]);

exports.insert = insert;
//# sourceMappingURL=insert.js.map