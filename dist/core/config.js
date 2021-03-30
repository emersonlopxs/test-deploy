"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AZURE_STORAGE_CONNECTION_STRING = exports.SENDGRID_KEY = exports.SENDGRID_FROM = exports.SENDGRID_SUBJECT_RESET_PASSWORD = exports.DB_CERT = exports.DB_USER = exports.DB_PORT = exports.DB_PASSWORD = exports.DB_HOST = exports.DB_NAME = exports.DEFAULT_PASSWORD = exports.BCRYPT_ROUNDS = exports.JWT_SECRET = exports.LOG_REQUESTS_RESPONSES_TO_CONSOLE = exports.IS_PRODUCTION_ENVIROMENT = exports.PORT = void 0;

var _errors = require("~/errors");

/**
 * Startup
 */
const PORT = process.env.PORT || 3000;
exports.PORT = PORT;
const IS_PRODUCTION_ENVIROMENT = process.env.NODE_ENV === "production";
/**
 * Develpment Options
 */

exports.IS_PRODUCTION_ENVIROMENT = IS_PRODUCTION_ENVIROMENT;
const LOG_REQUESTS_RESPONSES_TO_CONSOLE = !!process.env.LOG_REQUESTS_RESPONSES_TO_CONSOLE;
/**
 * JWT
 */

exports.LOG_REQUESTS_RESPONSES_TO_CONSOLE = LOG_REQUESTS_RESPONSES_TO_CONSOLE;
const JWT_SECRET = process.env.JWT_SECRET || "1234567890";
exports.JWT_SECRET = JWT_SECRET;
const BCRYPT_ROUNDS = process.env.BCRYPT_ROUNDS || 10;
exports.BCRYPT_ROUNDS = BCRYPT_ROUNDS;
const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || "12345678";
/**
 * Database
 */

exports.DEFAULT_PASSWORD = DEFAULT_PASSWORD;
const {
  DB_NAME
} = process.env;
exports.DB_NAME = DB_NAME;
const {
  DB_HOST
} = process.env;
exports.DB_HOST = DB_HOST;
const {
  DB_PASSWORD
} = process.env;
exports.DB_PASSWORD = DB_PASSWORD;
const {
  DB_PORT
} = process.env;
exports.DB_PORT = DB_PORT;
const {
  DB_USER
} = process.env;
exports.DB_USER = DB_USER;
const {
  DB_CERT
} = process.env;
/**
 * Sendgrid
 */

exports.DB_CERT = DB_CERT;
const SENDGRID_SUBJECT_RESET_PASSWORD = process.env.SENDGRID_SUBJECT_RESET_PASSWORD || "Gerando Falcões - Recuperação de senha";
exports.SENDGRID_SUBJECT_RESET_PASSWORD = SENDGRID_SUBJECT_RESET_PASSWORD;
const {
  SENDGRID_FROM
} = process.env;
exports.SENDGRID_FROM = SENDGRID_FROM;
const {
  SENDGRID_KEY
} = process.env;
/**
 * CLOUD FILE STORAGE
 */

exports.SENDGRID_KEY = SENDGRID_KEY;
const {
  AZURE_STORAGE_CONNECTION_STRING
} = process.env;
/**
 * Required variables
 */

exports.AZURE_STORAGE_CONNECTION_STRING = AZURE_STORAGE_CONNECTION_STRING;

if (process.env.NODE_ENV !== "test") {
  ["DB_NAME", "DB_HOST", "DB_PASSWORD", "DB_USER", "DB_CERT", "SENDGRID_FROM", "SENDGRID_KEY"].forEach(item => {
    if (!process.env[item]) throw new _errors.StartupError(`The enviroment variable is required: ${item} - NODE_ENV: ${process.env.NODE_ENV}`);
  });
}
//# sourceMappingURL=config.js.map