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
Object.defineProperty(exports, "insert", {
  enumerable: true,
  get: function () {
    return _insert.insert;
  }
});
Object.defineProperty(exports, "update", {
  enumerable: true,
  get: function () {
    return _update.update;
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

var _auth = require("~/core/auth");

var _list = require("./list");

var _get = require("./get");

var _insert = require("./insert");

var _register = require("./register");

var _update = require("./update");

var _remove = require("./remove");

const router = (0, _express.Router)();
exports.router = router;
router.post("/", _auth.auth, (req, res, next) => (0, _insert.insert)(req.body).then(data => res.json(data)).catch(next));
router.post("/register", (req, res, next) => (0, _register.register)(req.body).then(data => res.json(data)).catch(next));
router.get("/", _auth.auth, (req, res, next) => (0, _list.list)(req.query).then(data => res.json(data)).catch(next));
router.get("/:id", _auth.auth, (req, res, next) => (0, _get.get)(req.params).then(data => res.json(data)).catch(next));
router.patch("/:id", _auth.auth, (req, res, next) => (0, _update.update)({ ...req.params,
  ...req.body
}).then(() => res.status(204).end()).catch(next));
router.delete("/:id", _auth.auth, (req, res, next) => (0, _remove.remove)(req.params).then(() => res.status(204).end()).catch(next));
//# sourceMappingURL=index.js.map