"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _express = require("express");

var _auth = require("~/core/auth");

var _buffer = require("~/helpers/buffer");

var _resetPassword = require("./reset-password");

var _changePassword = require("./change-password");

var _getPhoto = require("./get-photo");

var _putPhoto = require("./put-photo");

var _deletePhoto = require("./delete-photo");

const router = (0, _express.Router)();
exports.router = router;
router.post("/changepassword", (req, res, next) => (0, _changePassword.changePassword)(req.body).then(() => res.status(204).end()).catch(next));
router.post("/resetpassword", (req, res, next) => (0, _resetPassword.resetPassword)(req.body).then(data => res.json(data)).catch(next));
router.get("/photo", _auth.auth, (req, res, next) => (0, _getPhoto.getPhoto)(req.auth.id).then(data => res.send(data)).catch(next));
router.put("/photo", _auth.auth, (req, res, next) => (0, _buffer.streamToBuffer)(req).then(photo => (0, _putPhoto.putPhoto)(req.auth.id, photo).then(() => res.status(201).end()).catch(next)));
router.delete("/photo", _auth.auth, (req, res, next) => (0, _deletePhoto.deletePhoto)(req.auth.id).then(() => res.status(204).end()).catch(next));
//# sourceMappingURL=index.js.map