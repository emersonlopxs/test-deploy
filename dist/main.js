"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = start;

var _app = require("./core/app");

var _config = require("./core/config");

/* eslint-disable no-console */
async function start() {
  console.log(new Date(), "Initializing...");

  try {
    _app.app.listen(_config.PORT, () => console.log(new Date(), `Server up at port ${_config.PORT}`));
  } catch (error) {
    console.error("Failed to start application", error);
  }
}
//# sourceMappingURL=main.js.map