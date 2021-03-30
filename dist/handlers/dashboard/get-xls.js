"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getXls = void 0;

var models = _interopRequireWildcard(require("~/models"));

async function setHeader(data, res) {
  res.setHeader("Content-disposition", `attachment; filename=${data.name}.csv`);
  res.setHeader("Content-type", "text/csv");
  return {
    data,
    res
  };
}

const getXls = (params, response) => setHeader(params, response).then(({
  data,
  res
}) => models.dashboard.getXls(data, res));

exports.getXls = getXls;
//# sourceMappingURL=get-xls.js.map