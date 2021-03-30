"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listWithSubjects = void 0;

var models = _interopRequireWildcard(require("~/models"));

const transform = data => ({ ...data,
  rows: data.rows.reduce((list, item) => {
    const index = list.filter(subject => subject.id === item.gradeId);
    const formattedItem = {
      id: item.subjectId,
      name: item.subjectName,
      color: item.subjectColor
    };

    if (index.length === 1) {
      index[0].subjects.push(formattedItem);
    } else {
      list.push({
        id: item.gradeId,
        name: item.gradeName,
        subjects: [formattedItem]
      });
    }

    return list;
  }, [])
});

const listWithSubjects = params => models.grades.listWithSubjects(params).then(transform);

exports.listWithSubjects = listWithSubjects;
//# sourceMappingURL=list-with-subjects.js.map