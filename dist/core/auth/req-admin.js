"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reqAdmin = reqAdmin;

var _errors = require("~/errors");

async function reqAdmin(req, res, next) {
  if (req.auth.role !== "admin") throw new _errors.UnauthorizedError();
  next();
}
//# sourceMappingURL=req-admin.js.map