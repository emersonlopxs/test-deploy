"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.swaggerDoc = exports.swagger = void 0;

var _express = require("express");

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swaggerDocsPaths = _interopRequireDefault(require("./swagger-docs-paths.json"));

const swagger = (0, _express.Router)();
exports.swagger = swagger;
const swaggerDoc = {
  openapi: "3.0.1",
  info: {
    title: "Swagger",
    version: "1.0.0"
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  security: [{
    bearerAuth: []
  }],
  paths: _swaggerDocsPaths.default
};
exports.swaggerDoc = swaggerDoc;

if (process.env.NODE_ENV === "production") {
  swagger.use("/api-docs", (req, res) => {
    return res.status(404).send({
      error: "not found"
    });
  });
}

swagger.use("/api-docs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(swaggerDoc));
swagger.get("/", (req, res) => res.redirect("/api-docs"));
//# sourceMappingURL=swagger.js.map