"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.from = exports.select = void 0;
const select = `
  select
    m.userId,
    m.name,
    u.username
`;
exports.select = select;
const from = `
  from mentors m
  join users u on u.id = m.userId
`;
exports.from = from;
//# sourceMappingURL=sqls.js.map