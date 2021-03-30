"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

require("dotenv/config");

var _login = require("./login");

var users = _interopRequireWildcard(require("~/models/users"));

var helpers = _interopRequireWildcard(require("~/helpers"));

jest.mock("~/models/users");
describe("OAuth tests", () => {
  const username = "bob@contoso.com";
  const password = "12345678";
  const gradeId = 1;
  const name = "Bob Robert";
  const role = "student";
  test("Login test", done => {
    helpers.password.hash(password).then(hashed => {
      users.getCredentialsInfo.mockResolvedValue({
        id: 1,
        username,
        password: hashed,
        createdAt: new Date(),
        modifiedAt: new Date(),
        role
      });
      users.getRoleInfo.mockResolvedValue({
        name,
        gradeId
      });
      (0, _login.login)({
        username,
        password
      }).then(helpers.jwt.verify).then(payload => {
        expect(payload.username).toBe(username);
        expect(payload.gradeId).toBe(gradeId);
        expect(payload.name).toBe(name);
        expect(payload.username).toBe(username);
        expect(payload.role).toBe(role);
        done();
      });
    });
  });
});
//# sourceMappingURL=test.js.map