"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = void 0;

var db = _interopRequireWildcard(require("~/core/database"));

const remove = async ({
  id
}) => db.beginTransaction(async trans => {
  await trans.remove("delete from classesClasses where childClassId = ?", [id]);
  await trans.remove("delete from classesClasses where parentClassId = ?", [id]);
  await trans.remove("delete from classesContents where classId = ?", [id]);
  await trans.remove("delete from classes where id = ?", [id]);
});

exports.remove = remove;
//# sourceMappingURL=remove.js.map