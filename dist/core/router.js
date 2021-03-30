"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _express = require("express");

var _auth = require("./auth");

var handlers = _interopRequireWildcard(require("~/handlers"));

const router = (0, _express.Router)();
exports.router = router;
router.use("/oauth", handlers.oauth.router);
router.use("/utils/", handlers.utils.router);
router.use("/user/", handlers.user.router);
router.use("/students/", handlers.students.router);
router.use("/teachers/", handlers.teachers.router);
router.use("/sites", handlers.site.router);
router.use("/grades/", handlers.grades.router);
router.use("/subjects/", handlers.subjects.router);
router.use("/classTypes/", handlers.classTypes.router);
router.use("/admins/", _auth.auth, handlers.admins.router);
router.use("/tags/", _auth.auth, handlers.tags.router);
router.use("/mentors/", _auth.auth, handlers.mentors.router);
router.use("/dashboard/", _auth.auth, handlers.dashboard.router);
router.use("/grades/", _auth.auth, handlers.grades.router);
router.use("/classes/", _auth.auth, handlers.classes.router);
router.use("/associates/", _auth.auth, handlers.associates.router);
//# sourceMappingURL=router.js.map