"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listSchools = void 0;

var models = _interopRequireWildcard(require("~/models"));

const listSchools = async ({
  state,
  city,
  type
}) => {
  const schools = await models.qedu.getSchools(state, city);

  if (type === "publicas") {
    return schools.filter(school => school.isPrivateSchool !== 1);
  }

  if (type === "privadas") {
    return schools.filter(school => school.isPrivateSchool === 1);
  }

  return schools;
};

exports.listSchools = listSchools;
//# sourceMappingURL=list-schools.js.map