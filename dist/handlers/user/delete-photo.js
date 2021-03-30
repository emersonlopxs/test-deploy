"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePhoto = void 0;

var _storageBlob = require("@azure/storage-blob");

var _config = require("~/core/config");

const deletePhoto = async userId => {
  const blobServiceClient = _storageBlob.BlobServiceClient.fromConnectionString(_config.AZURE_STORAGE_CONNECTION_STRING);

  const containerClient = blobServiceClient.getContainerClient("user-photos");
  const blockBlobClient = containerClient.getBlockBlobClient(userId.toString());
  await blockBlobClient.delete();
};

exports.deletePhoto = deletePhoto;
//# sourceMappingURL=delete-photo.js.map