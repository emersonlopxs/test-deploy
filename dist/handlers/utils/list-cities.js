"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listCities = void 0;

var models = _interopRequireWildcard(require("~/models"));

const listCities = async ({
  state
}) => models.qedu.getCities(state);

exports.listCities = listCities;
//# sourceMappingURL=list-cities.js.map