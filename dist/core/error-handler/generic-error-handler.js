"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genericErrorHandler = genericErrorHandler;

var _serializeError = require("serialize-error");

var _errors = require("~/errors");

var _utils = require("~/handlers/utils");

var _config = require("../config");

/* eslint-disable no-debugger */

/* eslint-disable no-unused-vars */

/* eslint-disable no-console */

/**
 * Generic error handler
 *  - Check if the error is an ExplosableError
 *    * Yes: send the error message to the client
 *    * No: console.log the error and send an 500 status code to the client
 *
 * @param {Object} error The error object
 * @param {Object} req The express.js request object
 * @param {Object} res The express.js response object
 * @param {Function} next The express.js next callback
 */
function genericErrorHandler(error, req, res, next) {
  const printableError = (0, _serializeError.serializeError)(error);

  if (error instanceof _errors.ExposableError) {
    console.error("genericErrorHandler(ExposableError): ", printableError);
    res.status(error.statusCode || 400).json(error.message);
  } else {
    console.error("genericErrorHandler(500): ", printableError);
    debugger;
    (0, _utils.insertErrors)({
      project: "gerando-falcoes",
      package: "backend",
      enviroment: process.env.NODE_ENV,
      message: error.message,
      stack: error.stack,
      error: JSON.stringify(printableError, null, 2)
    }).then(errorId => {
      req.error = printableError;
      req.errorId = errorId;
      res.status(500).json({
        message: `Internal sever error, contact support and please inform the errorId: ${errorId}`,
        errorId
      });
    });
  }
}
//# sourceMappingURL=generic-error-handler.js.map