"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPhoto = void 0;

var _storageBlob = require("@azure/storage-blob");

var _config = require("~/core/config");

var _buffer = require("~/helpers/buffer");

const getPhoto = async userId => {
  const blobServiceClient = _storageBlob.BlobServiceClient.fromConnectionString(_config.AZURE_STORAGE_CONNECTION_STRING);

  const containerClient = blobServiceClient.getContainerClient("user-photos");
  const blockBlobClient = containerClient.getBlockBlobClient(userId.toString());
  const downloadResponse = await blockBlobClient.download();
  const photoBuffer = await (0, _buffer.streamToBuffer)(downloadResponse.readableStreamBody);
  return photoBuffer;
};

exports.getPhoto = getPhoto;
//# sourceMappingURL=get-photo.js.map