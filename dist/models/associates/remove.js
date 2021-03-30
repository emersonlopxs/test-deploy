"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = void 0;

var _storageBlob = require("@azure/storage-blob");

var _config = require("~/core/config");

var _database = require("~/core/database");

const remove = async ({
  id
}) => (0, _database.beginTransaction)(async trans => {
  const [, mimetype] = await trans.first(`
        select
          imageLink
        from associates
        where id = ?
        `, [id]).then(({
    imageLink
  }) => imageLink.split(`${id}`));

  const blobServiceClient = _storageBlob.BlobServiceClient.fromConnectionString(_config.AZURE_STORAGE_CONNECTION_STRING);

  const containerClient = blobServiceClient.getContainerClient("associates-images");
  const blockBlobClient = containerClient.getBlockBlobClient(`${id}${mimetype}`);
  await blockBlobClient.delete();
  await trans.remove("delete from associates where id = ?", [id]);
});

exports.remove = remove;
//# sourceMappingURL=remove.js.map