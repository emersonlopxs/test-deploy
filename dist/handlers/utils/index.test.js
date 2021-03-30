"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

require("dotenv/config");

var handler = _interopRequireWildcard(require("./index"));

var models = _interopRequireWildcard(require("~/models"));

jest.mock("~/models/accesses");
describe("Cities", () => {
  it("List Cities", async () => {
    const [firstCity] = await handler.listCities({
      state: "SP"
    });
    expect(firstCity).toBe("Adamantina");
  });
});
describe("Schools", () => {
  it("List Schools", async () => {
    const [firstSchool] = await handler.listSchools({
      state: "MG",
      city: "Contagem",
      type: "publicas"
    });
    const {
      nomeEscola
    } = firstSchool;
    expect(nomeEscola).toBe("CEFET MG- CAMPUS CONTAGEM");
  });
});
describe("Access", () => {
  models.accesses.list.mockImplementation(async () => [{
    userId: 0,
    userName: "test",
    roleName: "test",
    screenName: "test",
    env: "test",
    hitted: new Date()
  }]);
  it("List Access", async () => {
    const [firstCity] = await handler.listAccesses({
      limit: 1
    });
    expect(firstCity.userId).toBe(0);
  });
});
//# sourceMappingURL=index.test.js.map