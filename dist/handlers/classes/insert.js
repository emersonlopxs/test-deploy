"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insert = void 0;

var models = _interopRequireWildcard(require("~/models"));

function matchYoutubeUrl(url) {
  const pattern = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  const matchResult = url.match(pattern);

  if (matchResult) {
    return matchResult[1];
  }

  return null;
}

const postNewClass = async ({
  contents,
  ...others
}) => ({
  contents: contents.map(content => ({ ...content,
    type: matchYoutubeUrl(content.url) ? "youtube" : "link"
  })),
  ...others
});

const insert = (params, authId) => postNewClass(params).then(value => models.classes.insert(value, authId));

exports.insert = insert;
//# sourceMappingURL=insert.js.map