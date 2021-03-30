"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = logger;

var _config = require("./config");

/* eslint-disable prefer-rest-params */

/* eslint-disable func-names */

/* eslint-disable no-console */

/**
 * Log requests/responses to database
 *
 * @param {Object} req The express.js request object
 * @param {Object} res The express.js response object
 * @param {Function} next The express.js next callback
 */
function logger(storeHandler) {
  return function (req, res, next) {
    if (req.path.startsWith("/api-docs/")) return next();
    const oldWrite = res.write;
    const oldEnd = res.end;
    const chunks = [];

    res.write = function (chunk) {
      chunks.push(chunk);
      return oldWrite.apply(res, arguments);
    };

    res.end = function (chunk) {
      if (chunk) chunks.push(chunk);
      const resbody = chunks.join("");
      const ip = req.headers["client-ip"];
      const enviroment = process.env.NODE_ENV;
      const envvars = {};
      const {
        protocol,
        method,
        path,
        route,
        headers: reqheaders,
        params: reqparams,
        body: reqbody,
        query: reqquery,
        error,
        errorId
      } = req;
      const {
        authorization
      } = reqheaders;
      const {
        statusCode,
        statusMessage
      } = res;
      const resheaders = res.getHeaders();
      const logData = {
        enviroment,
        ip,
        protocol,
        method,
        path,
        route,
        authorization,
        reqheaders,
        reqparams,
        reqbody,
        reqquery,
        statusCode,
        statusMessage,
        resheaders,
        resbody,
        envvars,
        error,
        errorId
      };
      const simpleLogData = {
        ip,
        protocol,
        method,
        path,
        route,
        authorization,
        reqparams,
        reqbody,
        reqquery,
        statusCode,
        statusMessage,
        resbody,
        errorId
      };
      if (_config.LOG_REQUESTS_RESPONSES_TO_CONSOLE) console.log(simpleLogData);
      if (storeHandler) storeHandler(logData, req, res);
      oldEnd.apply(res, arguments);
    };

    return next();
  };
}
//# sourceMappingURL=logger.js.map