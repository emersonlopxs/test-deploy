"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.approve = void 0;

var db = _interopRequireWildcard(require("~/core/database"));

const approve = async ({
  id,
  userid
}) => db.update(`
      update classes
        set approvedBy = ?
        , approvedDate = now()
      where id = ?
    `, [userid, id]);

exports.approve = approve;
//# sourceMappingURL=approve.js.map