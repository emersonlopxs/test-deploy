"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insert = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _util = _interopRequireDefault(require("util"));

var _uuid = _interopRequireDefault(require("uuid"));

var _os = _interopRequireDefault(require("os"));

var _path = _interopRequireDefault(require("path"));

var _storageBlob = require("@azure/storage-blob");

var _config = require("~/core/config");

var _database = require("~/core/database");

const fsWriteFileAsync = _util.default.promisify(_fs.default.writeFile);

const fsUnlinkAsync = _util.default.promisify(_fs.default.unlink);

const fsRealPathAsync = _util.default.promisify(_fs.default.realpath);

const insert = async ({
  name,
  color,
  description,
  button,
  link,
  ...params
}) => (0, _database.beginTransaction)(async trans => {
  const [, mimetype] = params["0"].mimetype.split("/");
  const imageBuffer = params["0"].buffer;
  const associateId = await trans.insert(`
      insert into associates(
        name,
        color,
        description,
        button,
        link,
        created_at,
        modified_at
      ) values (
        ?, ?, ?, ?, ?, now(), now()
      )
      `, [name, color, description, button, link]);
  const imageLink = `https://gfacolesblob.blob.core.windows.net/associates-images/${associateId}.${mimetype}`;
  await trans.update(`
      update associates
        set imageLink = ?
      where id = ?
      `, [imageLink, associateId]);

  const blobServiceClient = _storageBlob.BlobServiceClient.fromConnectionString(_config.AZURE_STORAGE_CONNECTION_STRING);

  const containerClient = blobServiceClient.getContainerClient("associates-images");
  const tempDir = await fsRealPathAsync(_os.default.tmpdir());

  const tempfile = _path.default.join(tempDir, _uuid.default.v4());

  await fsWriteFileAsync(tempfile, imageBuffer);
  const blobClient = containerClient.getBlobClient(`${associateId.toString()}.${mimetype}`);
  const blockBlobClient = blobClient.getBlockBlobClient();
  await blockBlobClient.uploadFile(tempfile);
  await fsUnlinkAsync(tempfile);
});

exports.insert = insert;
//# sourceMappingURL=insert.js.map