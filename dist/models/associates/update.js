"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = void 0;

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

const update = async ({
  id,
  name,
  color,
  description,
  button,
  link,
  ...params
}) => (0, _database.beginTransaction)(async trans => {
  let imageBuffer;
  if (params["0"]) imageBuffer = params["0"].buffer;
  await trans.update(`
      update associates set
        name = coalesce(?, name),
        color = coalesce(?, color),
        description = coalesce(?, description),
        button = coalesce(?, button),
        link = coalesce(?, link),
        modified_at = now()
      where id = ?
      `, [name, color, description, button, link, id]);

  if (imageBuffer) {
    let [, mimetype] = await trans.first(`
          select
            imageLink
          from associates
          where id = ?
          `, [id]).then(({
      imageLink
    }) => imageLink.split(`${id}`));

    const blobServiceClient = _storageBlob.BlobServiceClient.fromConnectionString(_config.AZURE_STORAGE_CONNECTION_STRING);

    const containerClient = blobServiceClient.getContainerClient("associates-images");
    let blockBlobClient = containerClient.getBlockBlobClient(`${id}${mimetype}`);
    await blockBlobClient.delete();
    [, mimetype] = params["0"].mimetype.split("/");
    const imageLink = `https://gfacolesblob.blob.core.windows.net/associates-images/${id}.${mimetype}`;
    await trans.update(`
        update associates
          set imageLink = ?,
          modified_at = now()
        where id = ?
        `, [imageLink, id]);
    const tempDir = await fsRealPathAsync(_os.default.tmpdir());

    const tempfile = _path.default.join(tempDir, _uuid.default.v4());

    await fsWriteFileAsync(tempfile, imageBuffer);
    const blobClient = containerClient.getBlobClient(`${id}.${mimetype}`);
    blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.uploadFile(tempfile);
    await fsUnlinkAsync(tempfile);
  }
});

exports.update = update;
//# sourceMappingURL=update.js.map