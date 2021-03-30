"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _router = require("./router");

var _swagger = require("./swagger");

var _errorHandler = require("./error-handler");

var _openapiValidator = require("./openapi-validator");

var _logger = require("./logger");

var _logdb = require("./logdb");

const app = (0, _express.default)();
exports.app = app;
app.use(_express.default.static('public'));
app.use(_express.default.json());
app.use((0, _logger.logger)(_logdb.logdb));
app.use((0, _morgan.default)("dev"));
app.use((0, _helmet.default)());
app.use((0, _cors.default)());
app.use(_swagger.swagger);
app.use(_openapiValidator.oasValidator);
app.use(_router.router);
app.use(_errorHandler.errorHandler);
//# sourceMappingURL=app.js.map