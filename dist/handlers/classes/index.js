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
Object.defineProperty(exports, "listWithContent", {
  enumerable: true,
  get: function () {
    return _listWithContent.listWithContent;
  }
});
Object.defineProperty(exports, "get", {
  enumerable: true,
  get: function () {
    return _get.get;
  }
});
Object.defineProperty(exports, "insert", {
  enumerable: true,
  get: function () {
    return _insert.insert;
  }
});
Object.defineProperty(exports, "approve", {
  enumerable: true,
  get: function () {
    return _approve.approve;
  }
});
Object.defineProperty(exports, "remove", {
  enumerable: true,
  get: function () {
    return _remove.remove;
  }
});
exports.router = void 0;

var _express = require("express");

var _list = require("./list");

var _listWithContent = require("./list-with-content");

var _get = require("./get");

var _insert = require("./insert");

var _approve = require("./approve");

var _remove = require("./remove");

const router = (0, _express.Router)();
exports.router = router;
router.get("/contents", (req, res, next) => (0, _listWithContent.listWithContent)(req.query, {
  id: req.auth.id,
  role: req.auth.role
}).then(data => res.json(data)).catch(next));
router.get("/", (req, res, next) => (0, _list.list)(req.query).then(data => res.json(data)).catch(next));
router.get("/:id", (req, res, next) => (0, _get.get)(req.params).then(data => res.json(data)).catch(next));
router.post("/", (req, res, next) => (0, _insert.insert)(req.body, req.auth.id).then(() => res.status(201).end()).catch(next));
router.patch("/:id/approve", (req, res, next) => (0, _approve.approve)({ ...req.params,
  ...req.query
}).then(() => res.status(204).end()).catch(next));
router.delete("/:id", (req, res, next) => (0, _remove.remove)(req.params).then(() => res.status(204).end()).catch(next));
//# sourceMappingURL=index.js.map