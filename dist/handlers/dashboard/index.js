"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "list", {
  enumerable: true,
  get: function () {
    return _list.list;
  }
});
Object.defineProperty(exports, "get", {
  enumerable: true,
  get: function () {
    return _get.get;
  }
});
exports.router = void 0;

var _express = require("express");

var _list = require("./list");

var _get = require("./get");

var _getXls = require("./get-xls");

const router = (0, _express.Router)();
exports.router = router;
router.get("/", (req, res, next) => (0, _list.list)(req.query).then(data => res.json(data)).catch(next));
router.get("/:name", (req, res, next) => (0, _get.get)(req.params).then(data => res.json(data)).catch(next));
router.get("/:name/xls", (req, res, next) => (0, _getXls.getXls)(req.params, res).catch(next));
//# sourceMappingURL=index.js.map