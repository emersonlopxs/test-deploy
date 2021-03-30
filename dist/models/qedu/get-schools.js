"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSchools = void 0;

var _database = require("~/core/database");

const getSchools = async (state, city) => (0, _database.select)(`
      select *
      from resources.schools
      where country = 'BR'
      and state = ${(0, _database.escape)(state)}
      and city = ${(0, _database.escape)(city)}
    `);

exports.getSchools = getSchools;
//# sourceMappingURL=get-schools.js.map