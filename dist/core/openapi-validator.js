"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.oasValidator = void 0;

var _express = require("express");

var _expressOpenapiValidator = require("express-openapi-validator");

var _swagger = require("./swagger");

var _errors = require("../errors");

const oasValidator = (0, _express.Router)();
exports.oasValidator = oasValidator;
const oasMiddleware = (0, _expressOpenapiValidator.middleware)({
  apiSpec: _swagger.swaggerDoc,
  validateRequests: true,
  validateResponses: true
});
const oasMiddlewareWithExposableErrorModifier = [...oasMiddleware, (error, req, res, next) => {
  next(new _errors.ExposableError(JSON.stringify({
    message: error.message,
    errors: error.errors
  }, 400)));
}];
oasValidator.use(oasMiddlewareWithExposableErrorModifier);
//# sourceMappingURL=openapi-validator.js.map