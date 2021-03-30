"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.validateSync = void 0;

var _errors = require("~/errors");

const validateSync = (schema, input) => {
  const {
    error,
    value
  } = schema.validate(input, {
    abortEarly: false
  });
  if (error) throw new _errors.ExposableError(error.message);
  return value;
};

exports.validateSync = validateSync;

const validate = async (schema, input) => validateSync(schema, input);

exports.validate = validate;
//# sourceMappingURL=joi.js.map