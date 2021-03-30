"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePassword = exports.getRoleInfo = exports.getCredentialsInfo = void 0;

var _database = require("~/core/database");

const getCredentialsInfo = async (username) => (0, _database.first)(`
      select
        id
        , username
        , password
        , createdAt
        , modifiedAt
        , (
          select alias
          from usersRoles
            join roles on roles.id = usersRoles.roleId
          where userId = users.id
        ) as role
      from users
      where username = ?
    `, [username]);

exports.getCredentialsInfo = getCredentialsInfo;

const getRoleInfo = (role, userId) => {
  const queries = {
    teacher: `
        select
          t.name
          , t.state
          , t.city
          , t.graduationUniversityName
          , t.graduationYear
          , t.workSchoolName
          , t.ddd
          , t.telephone
          , s.id as subjectId
          , s.name as subjectName
          , s.color as subjectColor
        from teachers as t
        left join (
          select ts.teacherId, s.id, s.name, s.color
          from teachersSubjects as ts
          join subjects as s on s.id = ts.subjectId
          order by ts.id
        ) as s on s.teacherId = t.id
        where t.userId = ?
     `,
    student: `
        select
          name
          , gradeId
        from students
        where userId = ?
      `,
    admin: `
        select
          name
        from admin
        where userId = ?
     `,
    mentor: `
        select
          name
        from mentors
        where userId = ?
      `
  };
  return (0, _database.first)(queries[role], [userId]);
};

exports.getRoleInfo = getRoleInfo;

const updatePassword = async (username, password) => (0, _database.update)(`
      update users
        set password = ?
      where username = ?
    `, [password, username]);

exports.updatePassword = updatePassword;
//# sourceMappingURL=users.js.map