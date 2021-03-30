"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.teacher = exports.student = void 0;

var _database = require("~/core/database");

/* eslint-disable no-param-reassign */
const formatClasses = async (value, trans) => Promise.all(value.map(async item => ({
  id: item.id,
  title: item.title,
  teacher: {
    id: item.teacherId,
    userId: item.teacherUserId,
    name: item.teacherName
  },
  subjects: await trans.select(`
        select
          S.id,
          S.name,
          S.color,
          S.description
        from classesSubjects as CS
        join subjects as S on S.id = CS.subjectId
        where CS.classId = ?
        `, [item.id]),
  contents: await trans.select(`
        select
          CC.id,
          CC.thumbnail,
          CC.url,
          CC.type,
          CC.description
        from classesContents as CC
        join classes as C on C.id = CC.classId
        where CC.classId = ?
        `, [item.id]),
  childClasses: await trans.select(`
        select
          CC.childClassId
        from classesClasses as CC
        where CC.parentClassId = ?
        `, [item.id])
})));

const student = ({
  classIds,
  keyword,
  subjects,
  byGrade = true,
  limit = 10,
  offset = 0
}, loggedUserId) => (0, _database.beginTransaction)(async trans => {
  const rows = await trans.select(`
        select
          C.id,
          C.title,
          T.id as teacherId,
          T.userId as teacherUserId,
          T.name as teacherName
        from classesSubjects as CS
        join classes as C on C.id = CS.classId
        inner join teachers as T on T.userId = C.userId
        join students as S on S.userId = ?
        where 1 = 1
          ${byGrade === true ? `AND C.gradeId = S.gradeId` : ""}
          ${subjects ? `AND CS.subjectId in (${subjects.join()})` : ""}
          ${classIds ? `AND C.id in (${classIds.join()})` : ""}
          ${keyword ? `AND C.title like ${(0, _database.like)(keyword)}` : ""}
        group by C.id
        order by C.createdAt desc
        limit ${limit} offset ${offset}
        `, [loggedUserId]).then(value => formatClasses(value, trans));
  const {
    count: total
  } = await trans.first(`
      select
        count(distinct C.id) as count
      from classesSubjects as CS
      join classes as C on C.id = CS.classId
      inner join teachers as T on T.userId = C.userId
      join students as S on S.userId = ?
      where 1 = 1
        ${byGrade === true ? `AND C.gradeId = S.gradeId` : ""}
        ${subjects ? `AND CS.subjectId in (${subjects.join()})` : ""}
        ${classIds ? `AND C.id in (${classIds.join()})` : ""}
        ${keyword ? `AND C.title like ${(0, _database.like)(keyword)}` : ""}
      `, [loggedUserId]);
  return {
    limit,
    offset,
    filters: {
      byGrade,
      classIds,
      keyword,
      subjects
    },
    total,
    rows
  };
});

exports.student = student;

const teacher = ({
  classIds,
  keyword,
  subjects,
  limit = 10,
  offset = 0
}) => (0, _database.beginTransaction)(async trans => {
  const rows = await trans.select(`
        select
          C.id,
          C.title,
          T.id as teacherId,
          T.userId as teacherUserId,
          T.name as teacherName
        from classesSubjects as CS
        join classes as C on C.id = CS.classId
        inner join teachers as T on T.userId = C.userId
        where 1 = 1
          ${subjects ? `AND CS.subjectId in (${subjects.join()})` : ""}
          ${classIds ? `AND C.id in (${classIds.join()})` : ""}
          ${keyword ? `AND C.title like ${(0, _database.like)(keyword)}` : ""}
        group by C.id
        order by C.createdAt desc
        limit ${limit} offset ${offset}
      `).then(value => formatClasses(value, trans));
  const {
    count: total
  } = await trans.first(`
      select
        count(distinct C.id) as count
      from classesSubjects as CS
      join classes as C on C.id = CS.classId
      inner join teachers as T on T.userId = C.userId
      where 1 = 1
        ${subjects ? `AND CS.subjectId in (${subjects.join()})` : ""}
        ${classIds ? `AND C.id in (${classIds.join()})` : ""}
        ${keyword ? `AND C.title like ${(0, _database.like)(keyword)}` : ""}
      `);
  return {
    limit,
    offset,
    filters: {
      classIds,
      keyword,
      subjects
    },
    total,
    rows
  };
});

exports.teacher = teacher;
//# sourceMappingURL=list-with-content.js.map