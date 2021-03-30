"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.putPhoto = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _util = _interopRequireDefault(require("util"));

var _uuid = _interopRequireDefault(require("uuid"));

var _os = _interopRequireDefault(require("os"));

var _path = _interopRequireDefault(require("path"));

var _storageBlob = require("@azure/storage-blob");

var _config = require("~/core/config");

const fsWriteFileAsync = _util.default.promisify(_fs.default.writeFile);

const fsUnlinkAsync = _util.default.promisify(_fs.default.unlink);

const fsRealPathAsync = _util.default.promisify(_fs.default.realpath);

const putPhoto = async (userId, photo) => {
  const blobServiceClient = _storageBlob.BlobServiceClient.fromConnectionString(_config.AZURE_STORAGE_CONNECTION_STRING);

  const containerClient = blobServiceClient.getContainerClient("user-photos"); // Buffer: not working - Feb, 6 2020

  /* const blobClient = containerClient.getBlobClient(userid.toString());
    const blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(photo, photo.length); */
  // Stream: not working - Feb, 6 2020

  /* const blobClient = containerClient.getBlobClient(userid.toString());
    const blockBlobClient = blobClient.getBlockBlobClient();
    const stream = this.bufferToStream(photo);
    await blockBlobClient.uploadStream(stream); */
  // *** Please keep the above comments to the next developer knows that It has been tried ***
  // TempFile: working

  const tempDir = await fsRealPathAsync(_os.default.tmpdir());

  const tempfile = _path.default.join(tempDir, _uuid.default.v4());

  await fsWriteFileAsync(tempfile, photo);
  const blobClient = containerClient.getBlobClient(userId.toString());
  const blockBlobClient = blobClient.getBlockBlobClient();
  await blockBlobClient.uploadFile(tempfile);
  await fsUnlinkAsync(tempfile);
};

exports.putPhoto = putPhoto;
//# sourceMappingURL=put-photo.js.map