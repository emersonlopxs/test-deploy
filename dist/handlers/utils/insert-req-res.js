"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertReqRes = void 0;

var models = _interopRequireWildcard(require("~/models"));

const insertReqRes = params => models.reqres.insert(params);

exports.insertReqRes = insertReqRes;
//# sourceMappingURL=insert-req-res.js.map