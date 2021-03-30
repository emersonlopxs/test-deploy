"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.from = exports.select = void 0;

/** that sql module is not a architecture rule, here we are using because
 *  that queries is little big longer/complex than usual
 */
const select = `
  select
    id,
    name,
    siteCode,
    city,
    state,
    createdAt,
    modifiedAt
  `;
exports.select = select;
const from = `
  from sites
`;
exports.from = from;
//# sourceMappingURL=sqls.js.map