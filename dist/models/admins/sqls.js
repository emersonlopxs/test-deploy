"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.from = exports.select = void 0;
const select = `
  select
    a.userId,
    a.name,
    u.username
`;
exports.select = select;
const from = `
  from admin a
  join users u on u.id = a.userId
`;
exports.from = from;
//# sourceMappingURL=sqls.js.map