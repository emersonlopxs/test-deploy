"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _express = require("express");

var _login = require("./login");

const router = (0, _express.Router)();
exports.router = router;
router.post("/", (req, res, next) => (0, _login.login)({
  username: req.body.username,
  password: req.body.password
}).then(data => res.json(data)).catch(next));
//# sourceMappingURL=index.js.map