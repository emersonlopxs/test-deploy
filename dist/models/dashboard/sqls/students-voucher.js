"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.studentsVoucher = void 0;
// eslint-disable-next-line camelcase
const studentsVoucher = `
  select
    s.name as studentName
    , s.schoolName as schoolName
    , s.city as cityName
    , s.state as stateName
    , s.createdAt

  from students as s

  where s.createdAt between ? and ?
  and s.voucherIssued is not null
  order by 1
`;
exports.studentsVoucher = studentsVoucher;
//# sourceMappingURL=students-voucher.js.map