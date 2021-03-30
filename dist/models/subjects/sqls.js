"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.from = exports.select = void 0;
const select = `
  select
    id,
    name,
    color,
    description,
    siteId,
    classTypeId
`;
exports.select = select;
const from = `
  from subjects
`;
exports.from = from;
//# sourceMappingURL=sqls.js.map