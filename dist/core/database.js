"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = update;
exports.insert = insert;
exports.remove = remove;
exports.newSet = newSet;
exports.beginTransaction = beginTransaction;
exports.first = exports.select = exports.like = exports.escape = exports.pipe = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _config = require("./config");

/* eslint-disable no-console */
function ErrorWithCode(message, code, extra) {
  this.message = message;
  this.code = code;
  this.extra = extra;
}

const snakeCaseToCamelCase = snakeCaseSentence => snakeCaseSentence.replace(/[_]./g, underscoreLetter => underscoreLetter[1].toUpperCase());

const camelCaseToSnakeCase = camelCaseSentence => camelCaseSentence.replace(/([a-z])([A-Z])([a-z])/g, (match, lowerCaseLetterBefore, uperCaseLetter, lowerCaseLetterAfter) => `${lowerCaseLetterBefore}_${uperCaseLetter.toLowerCase()}${lowerCaseLetterAfter}`);

const snakedCaseObjectKeysToCamelCase = snakedCaseObject => {
  const objectKeys = Object.keys(snakedCaseObject).map(key => ({
    snakeCaseKey: key,
    camelCaseKey: snakeCaseToCamelCase(key)
  }));
  const camelCaseObject = {};
  objectKeys.forEach(keys => {
    const {
      snakeCaseKey,
      camelCaseKey
    } = keys;
    camelCaseObject[camelCaseKey] = snakedCaseObject[snakeCaseKey];
  });
  return camelCaseObject;
};

const buildSqlTextFromParams = (sql, params = []) => {
  const queue = [...params];
  return sql.replace(/\?/g, () => {
    const paramValue = queue.shift();

    const paramValueEscaped = _mysql.default.escape(paramValue);

    return paramValueEscaped;
  });
};

async function openConnection() {
  const connectionOptions = {
    database: _config.DB_NAME,
    port: _config.DB_PORT,
    host: _config.DB_HOST,
    password: _config.DB_PASSWORD,
    user: _config.DB_USER,
    ssl: {}
  };

  if (!_config.DB_CERT) {
    delete connectionOptions.ssl;
  } else {
    connectionOptions.ssl = {
      ca: _fs.default.readFileSync(_path.default.join(__dirname, "..", "..", _config.DB_CERT))
    };
  }

  const connection = _mysql.default.createConnection(connectionOptions);

  connection.connect();
  return connection;
}

const closeConnection = connection => new Promise((resolve, reject) => {
  connection.end(err => {
    if (err) reject(err);else resolve();
  });
});

const pipe = async (sql, params, pipeHandler, res) => {
  const conn = await openConnection();
  await conn.query(camelCaseToSnakeCase(sql), params).stream().pipe(pipeHandler).pipe(res);
  await closeConnection(conn);
};

exports.pipe = pipe;

async function query(rawSql, params, externalConnection) {
  let myConnection;
  const sql = camelCaseToSnakeCase(rawSql);

  if (!_config.IS_PRODUCTION_ENVIROMENT) {
    console.log(new Date(), buildSqlTextFromParams(sql, params));
  }

  if (!externalConnection) myConnection = await openConnection();else myConnection = externalConnection;

  try {
    // return util.promisify(myConnection.query)(sql, params);
    return new Promise((resolve, reject) => {
      myConnection.query(sql, params, async (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  } finally {
    if (!externalConnection) await closeConnection(myConnection);
  }
}
/**
 * Escape user input to prevent SQL injection
 */


const escape = (...args) => _mysql.default.escape(args);
/**
 * Prepare a term to be searchable in like expressions
 *
 * @param {string} term
 */


exports.escape = escape;

const like = term => {
  let newTerm = term.trim();
  if (!newTerm.startsWith("%")) newTerm = `%${newTerm}`;
  if (!newTerm.endsWith("%")) newTerm = `${newTerm}%`;
  return _mysql.default.escape(newTerm);
};
/**
 * Perform the SQL query passed and return all rows *
 * @param {string} sql
 * @param {Array} params
 */


exports.like = like;

const select = (sql, params) => query(sql, params).then(rows => rows.map(row => snakedCaseObjectKeysToCamelCase(row)));
/**
 * Perform the SQL query passed and return the first row
 * @param {string} sql
 * @param {Array} params
 */


exports.select = select;

const first = (sql, params) => query(sql, params).then(rows => rows.length ? snakedCaseObjectKeysToCamelCase(rows[0]) : Promise.reject(new ErrorWithCode("Database Record Not Found", "ERR_DATABASE_GET_NOT_FOUND", buildSqlTextFromParams(sql, params))));
/**
 * Perform the SQL query passed and changed rows
 * @param {string} sql
 * @param {Array} params
 */


exports.first = first;

async function update(sql, params) {
  return (await query(sql, params)).changedRows;
}
/**
 * Perform the SQL query passed and return the inserted id
 * @param {string} sql
 * @param {Array} params
 */


async function insert(sql, params) {
  return (await query(sql, params)).insertId;
}
/**
 * Perform the SQL query passed and return changed rows
 * @param {string} sql
 * @param {Array} params
 */


async function remove(sql, params) {
  return (await query(sql, params)).affectedRows;
}
/**
 * Perform deletions, inserts necessary to set a new set of n:n relations
 * @param {string} selectQuery SQL Select query that return actual IDs, params: [parentId]
 * @param {string} insertQuery SQL Insert query to insert a new ID, params: [parentId, newId]
 * @param {string} deleteQuery SQL Delete query to remove and ID, params: [parentId, removedId]
 * @param {number[]} newIds Array of numbers with new IDs
 * @param {number} parentId The parent ID
 */


async function newSet(selectQuery, insertQuery, deleteQuery, newIds = [], parentId) {
  const oldOnes = (await select(selectQuery, [parentId])).map(oldRow => oldRow.childId);
  const newOnes = [...newIds].filter(newId => !oldOnes.includes(newId));
  const removedOnes = oldOnes.filter(oldId => !newIds.includes(oldId));
  await Promise.all(newOnes.map(newId => insert(insertQuery, [parentId, newId])));
  await Promise.all(removedOnes.map(removedId => remove(deleteQuery, [parentId, removedId])));
}
/**
 * Use that when you need to perform a series of queries that must be inside a transaction
 * The callback will receive an object that have the methods:
 *  - select
 *  - first
 *  - update
 *  - insert
 *  - remove
 *  - newSet
 * @param {Function} callback
 */


async function beginTransaction(callback) {
  const connection = await openConnection();
  await query("start transaction", [], connection);

  try {
    const ret = await callback({
      query: async (sql, params) => query(sql, params, connection).then(rows => rows.map(row => snakedCaseObjectKeysToCamelCase(row))),
      select: async (sql, params) => query(sql, params, connection).then(rows => rows.map(row => snakedCaseObjectKeysToCamelCase(row))),
      first: async (sql, params) => query(sql, params, connection).then(rows => rows.map(row => snakedCaseObjectKeysToCamelCase(row))).then(rows => rows.length ? rows[0] : Promise.reject(new ErrorWithCode("Not Found", "ERR_DATABASE_GET_NOT_FOUND"))),
      update: (sql, params) => query(sql, params, connection).then(({
        changedRows
      }) => changedRows),
      insert: (sql, params) => query(sql, params, connection).then(({
        insertId
      }) => insertId),
      remove: (sql, params) => query(sql, params, connection).then(({
        changedRows
      }) => changedRows),
      newSet: (selectQuery, insertQuery, deleteQuery, newIds, parentId) => newSet(selectQuery, insertQuery, deleteQuery, newIds, parentId)
    });
    await query("commit", [], connection);
    return ret;
  } catch (err) {
    await query("rollback", [], connection);
    throw err;
  } finally {
    await closeConnection(connection);
  }
}
//# sourceMappingURL=database.js.map