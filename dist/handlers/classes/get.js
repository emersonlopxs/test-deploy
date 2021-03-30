"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = void 0;

var models = _interopRequireWildcard(require("~/models"));

const get = params => models.classes.get(params).then(value => {
  if (value.length === 0) {
    return null;
  }

  const formattedClass = {
    id: value[0].classId,
    title: value[0].classTitle,
    gradeId: value[0].gradeId,
    classType: value[0].classType,
    themeId: value[0].themeId,
    themeName: value[0].themeName,
    workshopId: value[0].workshopId,
    workshopName: value[0].workshopName,
    teacher: {
      id: value[0].teacherId,
      userId: value[0].teacherUserId,
      name: value[0].teacherName
    },
    subject: {
      id: value[0].subjectId,
      name: value[0].subjectName
    },
    contents: value.map(item => {
      return {
        id: item.contentId,
        description: item.contentDescription,
        url: item.contentUrl,
        thumbnail: item.contentThumbnail,
        type: item.contentType
      };
    })
  };
  return formattedClass;
});

exports.get = get;
//# sourceMappingURL=get.js.map