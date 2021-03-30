"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.student = exports.teacher = void 0;

var _database = require("~/core/database");

/* eslint-disable no-extra-parens */
const createIdList = values => {
  let listId;

  if (values) {
    listId = values.map(row => row.id);
  }

  return listId;
};

const teacher = async ({
  cardNumbers = 6
}, loggedUserId) => {
  const workshops = await (0, _database.select)(`
    select
      S.id,
      S.name,
      S.color,
      S.description,
      (select count(*) as count
        from classesSubjects as CS
        where CS.subjectId = S.id) as classQuantity
    from subjects as S
    where
      S.classTypeId = 2
      AND (select count(*) as count
      from classesSubjects as CS
      where CS.subjectId = S.id) > 0
    order by S.modified_at desc
    limit ${cardNumbers}
    `);
  let subjects = await (0, _database.select)(`
    select
      S.id,
      S.name,
      S.color,
      S.description,
      (select count(*) as count
        from classesSubjects as CS
        where CS.subjectId = S.id) as classQuantity
    from subjects as S
    join teachersSubjects as TS on TS.subjectId = S.id
    join teachers as T on T.id = TS.teacherId
    where
      T.userId = ?
      AND (select count(*) as count
      from classesSubjects as CS
      where CS.subjectId = S.id) > 0
    order by S.modified_at desc
    limit ${cardNumbers}
    `, [loggedUserId]);

  if (subjects.length < cardNumbers) {
    const subjectsIds = createIdList(subjects);
    subjects = [...subjects, ...(await (0, _database.select)(`
        select
          S.id,
          S.name,
          S.color,
          S.description,
          (select count(*) as count
          from classesSubjects as CS
          where CS.subjectId = S.id) as classQuantity
        from subjects as S
        where
          classTypeId = 1 ${subjectsIds.length > 0 ? `AND S.id not in (${subjectsIds.join()})` : ""}
          AND (select count(*) as count
          from classesSubjects as CS
          where CS.subjectId = S.id) > 0
        order by S.modified_at desc
        limit ${cardNumbers - subjects.length}
        `, [loggedUserId]))];
  }

  let otherThemes = await (0, _database.select)(`
    select
      CT.id,
      CT.name,
      CT.description,
      (select count(*) as count
        from subjects as S
        join classesSubjects as CS on CS.subjectId = S.id
        where classTypeId = CT.id) as classQuantity
    from userClasses as UC
    join classTypes as CT on CT.id = UC.classTypeId
    where
      userId = ?
      AND classTypeId > 2
      AND (select count(*) as count
      from subjects as S
      join classesSubjects as CS on CS.subjectId = S.id
      where classTypeId = CT.id) > 0
    order by CT.modified_at desc
    `, [loggedUserId]);

  if (otherThemes.length < cardNumbers) {
    const otherThemesIds = createIdList(otherThemes);
    otherThemes = [...otherThemes, ...(await (0, _database.select)(`
        select
          CT.id,
          CT.name,
          CT.description,
          (select count(*) as count
            from subjects as S
            join classesSubjects as CS on CS.subjectId = S.id
            where classTypeId = CT.id) as classQuantity
        from userClasses as UC
        join classTypes as CT on CT.id = UC.classTypeId
        where
          classTypeId > 2 ${otherThemesIds.length > 0 ? `AND CT.id not in (${otherThemesIds.join()})` : ""}
          AND (select count(*) as count
          from subjects as S
          join classesSubjects as CS on CS.subjectId = S.id
          where classTypeId = CT.id) > 0
        group BY CT.id
        order by CT.modified_at desc
        `, [loggedUserId]))];
  }

  return {
    workshops,
    subjects,
    otherThemes
  };
};

exports.teacher = teacher;

const student = async ({
  cardNumbers = 6
}, loggedUserId) => {
  let workshops = await (0, _database.select)(`
    select
      S.id,
      S.name,
      S.color,
      S.description,
      (select count(*) as count
        from classesSubjects as CS
        where CS.subjectId = S.id) as classQuantity
    from subjects as S
    join userClasses as UC on UC.subjectId = S.id
    where
      UC.userId = ?
      AND S.classTypeId = 2
      AND (select count(*) as count
        from classesSubjects as CS
        where CS.subjectId = S.id) > 0
    group by S.id
    order by S.modified_at desc
    `, [loggedUserId]);
  let workshopsIds;

  if (workshops.length < cardNumbers) {
    workshopsIds = createIdList(workshops);
    workshops = [...workshops, ...(await (0, _database.select)(`
        select
          S.id,
          S.name,
          S.color,
          S.description,
          (select count(*) as count
            from classesSubjects as CS
            where CS.subjectId = S.id) as classQuantity
        from subjects as S
        join userClasses as UC on UC.subjectId = S.id
        join students as ST on ST.userId = ?
        where
          S.siteId = ST.siteId ${workshopsIds.length > 0 ? `AND S.id not in (${workshopsIds.join()})` : ""}
          AND (select count(*) as count
            from classesSubjects as CS
            where CS.subjectId = S.id) > 0
        group by id
        order by S.modified_at desc
        limit ${cardNumbers - workshops.length}
        `, [loggedUserId]))];
  }

  if (workshops.length < cardNumbers) {
    workshopsIds = createIdList(workshops);
    workshops = [...workshops, ...(await (0, _database.select)(`
        select
          S.id,
          S.name,
          S.color,
          S.description,
          (select count(*) as count
            from classesSubjects as CS
            where CS.subjectId = S.id) as classQuantity
        from subjects as S
        join userClasses as UC on UC.subjectId = S.id
        join students as ST on ST.userId = ?
        where
          S.siteId = ST.siteId ${workshopsIds.length > 0 ? `AND S.id not in (${workshopsIds.join()})` : ""}
          AND (select count(*) as count
            from classesSubjects as CS
            where CS.subjectId = S.id) > 0
        group by id
        order by S.modified_at desc
        limit ${cardNumbers - workshops.length}
        `, [loggedUserId]))];
  }

  if (workshops.length < cardNumbers) {
    workshopsIds = createIdList(workshops);
    workshops = [...workshops, ...(await (0, _database.select)(`
        select
          S.id,
          S.name,
          S.color,
          S.description,
          (select count(*) as count
            from classesSubjects as CS
            where CS.subjectId = S.id) as classQuantity
        from subjects as S
        where
          S.classTypeId = 2 ${workshopsIds.length > 0 ? `AND S.id not in (${workshopsIds.join()})` : ""}
          AND (select count(*) as count
            from classesSubjects as CS
            where CS.subjectId = S.id) > 0
        order by S.modified_at desc
        `, [loggedUserId]))];
  }

  const subjects = await (0, _database.select)(`
    select
      S.id,
      S.name,
      S.color,
      S.description,
      (select count(*) as count
        from classesSubjects as CS
        where CS.subjectId = S.id) as classQuantity
    from subjects as S
    join subjectsGrades as SG on SG.subjectId = S.id
    join students as ST on ST.gradeId = SG.gradeId
    where
      ST.userId = ?
      AND (select count(*) as count
        from classesSubjects as CS
        where CS.subjectId = S.id) > 0
    order by S.modified_at desc
    `, [loggedUserId]);
  let otherThemes = await (0, _database.select)(`
    select
      CT.id,
      CT.name,
      CT.description,
      (select count(*) as count
        from subjects as S
        join classesSubjects as CS on CS.subjectId = S.id
        where classTypeId = CT.id) as classQuantity
    from userClasses as UC
    join classTypes as CT on CT.id = UC.classTypeId
    where
      userId = ?
      AND classTypeId > 2
      AND (select count(*) as count
        from subjects as S
        join classesSubjects as CS on CS.subjectId = S.id
        where classTypeId = CT.id) > 0
    order by CT.modified_at desc
    `, [loggedUserId]);

  if (otherThemes.length < cardNumbers) {
    const otherThemesIds = createIdList(otherThemes);
    otherThemes = [...otherThemes, ...(await (0, _database.select)(`
        select
          CT.id,
          CT.name,
          CT.description,
          (select count(*) as count
            from subjects as S
            join classesSubjects as CS on CS.subjectId = S.id
            where classTypeId = CT.id) as classQuantity
        from userClasses as UC
        join classTypes as CT on CT.id = UC.classTypeId
        where
          classTypeId > 2 ${otherThemesIds.length > 0 ? `AND CT.id not in (${otherThemesIds.join()})` : ""}
          AND (select count(*) as count
            from subjects as S
            join classesSubjects as CS on CS.subjectId = S.id
            where classTypeId = CT.id) > 0
        order by CT.modified_at desc
        `, [loggedUserId]))];
  }

  return {
    workshops,
    subjects,
    otherThemes
  };
};

exports.student = student;
//# sourceMappingURL=list-carousels.js.map