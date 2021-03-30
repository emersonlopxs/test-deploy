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
Object.defineProperty(exports, "listSubjectsCarousels", {
  enumerable: true,
  get: function () {
    return _listSubjectsCarousels.listSubjectsCarousels;
  }
});
Object.defineProperty(exports, "listSubjects", {
  enumerable: true,
  get: function () {
    return _listSubjects.listSubjects;
  }
});
exports.router = void 0;

var _express = require("express");

var _list = require("./list");

var _get = require("./get");

var _insert = require("./insert");

var _update = require("./update");

var _remove = require("./remove");

var _listSubjectsCarousels = require("./list-subjects-carousels");

var _listSubjects = require("./list-subjects");

var _auth = require("~/core/auth");

const router = (0, _express.Router)();
exports.router = router;
router.get("/", (req, res, next) => (0, _list.list)(req.query).then(data => res.json(data)).catch(next));
router.get("/:id", _auth.auth, (req, res, next) => (0, _get.get)(req.params).then(data => res.json(data)).catch(next));
router.post("/", _auth.auth, (req, res, next) => (0, _insert.insert)(req.body).then(() => res.status(201).end()).catch(next));
router.patch("/:id", _auth.auth, (req, res, next) => (0, _update.update)({ ...req.params,
  ...req.body
}).then(() => res.status(204).end()).catch(next));
router.delete("/:id", _auth.auth, (req, res, next) => (0, _remove.remove)(req.params).then(() => res.status(204).end()).catch(next));
router.get("/subjects/carousels", _auth.auth, (req, res, next) => (0, _listSubjectsCarousels.listSubjectsCarousels)(req.query, {
  id: req.d,
  role: req.ole
}).then(data => res.json(data)).catch(next));
router.get("/:classTypeId/subjects", (req, res, next) => (0, _listSubjects.listSubjects)({ ...req.params,
  ...req.query
}).then(data => res.json(data)).catch(next));
//# sourceMappingURL=index.js.map