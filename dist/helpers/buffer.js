"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.streamToBuffer = void 0;

const streamToBuffer = stream => new Promise((resolve, reject) => {
  const chunks = [];
  stream.on("data", chunk => chunks.push(chunk)).once("end", () => resolve(Buffer.concat(chunks))).once("error", reject);
});

exports.streamToBuffer = streamToBuffer;
//# sourceMappingURL=buffer.js.map