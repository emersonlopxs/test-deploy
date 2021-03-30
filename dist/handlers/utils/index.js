"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "listAccesses", {
  enumerable: true,
  get: function () {
    return _listAccesses.listAccesses;
  }
});
Object.defineProperty(exports, "insertAccesses", {
  enumerable: true,
  get: function () {
    return _insertAccesses.insertAccesses;
  }
});
Object.defineProperty(exports, "urlMetadata", {
  enumerable: true,
  get: function () {
    return _getMetadata.urlMetadata;
  }
});
Object.defineProperty(exports, "listCities", {
  enumerable: true,
  get: function () {
    return _listCities.listCities;
  }
});
Object.defineProperty(exports, "listSchools", {
  enumerable: true,
  get: function () {
    return _listSchools.listSchools;
  }
});
Object.defineProperty(exports, "insertErrors", {
  enumerable: true,
  get: function () {
    return _insertErrors.insertErrors;
  }
});
exports.router = void 0;

var _express = require("express");

var _auth = require("~/core/auth");

var _listAccesses = require("./list-accesses");

var _insertAccesses = require("./insert-accesses");

var _getMetadata = require("./get-metadata");

var _listCities = require("./list-cities");

var _listSchools = require("./list-schools");

var _insertErrors = require("./insert-errors");

var _listErrors = require("./list-errors");

const router = (0, _express.Router)();
exports.router = router;
router.get("/errors", _auth.auth, (req, res, next) => (0, _listErrors.listErrors)(req.query).then(data => res.json(data)).catch(next));
router.post("/errors", _auth.auth, (req, res, next) => (0, _insertErrors.insertErrors)(req.body).then(() => res.status(201).end()).catch(next));
router.get("/accesses", _auth.auth, _auth.reqAdmin, (req, res, next) => (0, _listAccesses.listAccesses)(req.query).then(data => res.json(data)).catch(next));
router.post("/accesses", _auth.auth, (req, res, next) => (0, _insertAccesses.insertAccesses)(req.body).then(() => res.status(201).end()).catch(next));
router.get("/url/metadata", (req, res, next) => (0, _getMetadata.urlMetadata)(req.query).then(data => res.json(data)).catch(next));
router.get("/cities/:state", (req, res, next) => (0, _listCities.listCities)(req.params).then(data => res.json(data)).catch(next));
router.get("/schools/:state/:city", (req, res, next) => (0, _listSchools.listSchools)(req.params).then(data => res.json(data)).catch(next));
router.get("/schools/:state/:city/:type", (req, res, next) => (0, _listSchools.listSchools)(req.params).then(data => res.json(data)).catch(next));
//# sourceMappingURL=index.js.map