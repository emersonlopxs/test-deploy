"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCities = void 0;

var _database = require("~/core/database");

const getCities = async (state) => (0, _database.select)(`
    select
      city
    from resources.cities
    where country = 'BR'
    and state = ${(0, _database.escape)(state)}
  `).then(rows => rows.map(row => row.city));

exports.getCities = getCities;
//# sourceMappingURL=get-cities.js.map