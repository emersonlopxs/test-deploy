"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlMetadata = void 0;

var _urlMetadata = _interopRequireDefault(require("url-metadata"));

var _serializeError = require("serialize-error");

var _errors = require("~/errors");

const urlMetadata = ({
  url
}) => (0, _urlMetadata.default)(url).catch(error => {
  // Code extracted from url-metadata lib
  //  if (err || !response) {
  //     return dfd.reject(err)
  //   }
  const printableError = (0, _serializeError.serializeError)(error);
  const errorJson = JSON.stringify(printableError, null, 2);
  if (!error.Error) return Promise.reject(new _errors.ExposableError(errorJson, 500, error)); // Code extracted from url-metadata lib
  //   if (response.statusCode && response.statusCode !== 200) {
  //     return dfd.reject({ Error: 'response code ' + response.statusCode })
  //   }

  const errorMessage = error.Error;
  const errorParts = errorMessage.split(" ");
  const [,, statusCode] = errorParts;
  return Promise.reject(new _errors.ExposableError(errorMessage, statusCode, error));
});

exports.urlMetadata = urlMetadata;
//# sourceMappingURL=get-metadata.js.map