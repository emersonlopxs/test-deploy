"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

require("dotenv/config");

var handler = _interopRequireWildcard(require("./index"));

var models = _interopRequireWildcard(require("~/models"));

jest.mock("~/models/sites");
describe("Sites tests", () => {
  const site1 = {
    name: "site1",
    city: "SAO PAULO",
    state: "SP",
    siteCode: "981932"
  };
  const site2 = {
    name: "site2",
    city: "SAO PAULO",
    state: "SP",
    siteCode: "981932"
  };
  const site3 = {
    name: "site3",
    city: "SAO PAULO",
    state: "SP",
    siteCode: "981932"
  };
  const table = [];
  models.sites.get.mockImplementation(async params => {
    const {
      query,
      limit,
      offset
    } = params;
    return table.filter(item => item.name.includes(query)).slice(offset, limit + offset);
  });
  models.sites.list.mockImplementation(async params => {
    const {
      query,
      limit = 10,
      offset = 0
    } = params;
    if (query) return table.filter(item => item.name.includes(query)).slice(offset, limit + offset);
    return table.slice(offset, limit + offset);
  });
  models.sites.insert.mockImplementation(async row => {
    const id = table.length + 1;
    const createdAt = new Date();
    const modifiedAt = new Date();
    table.push({ ...row,
      id,
      createdAt,
      modifiedAt
    });
    return id;
  });
  models.sites.update.mockImplementation(async row => {
    const {
      id
    } = row;
    const modifiedAt = new Date(); // I want to keep the order of the array

    const index = table.findIndex(item => item.id === id);
    if (index < 0) throw new Error(`Item with Id ${id} not found on the table`);
    table[index] = { ...table[index],
      ...row,
      modifiedAt
    };
  });
  models.sites.remove.mockImplementation(async row => {
    const {
      id
    } = row; // I want to keep the order of the array

    const index = table.findIndex(item => item.id === id);
    if (index < 0) throw new Error(`Item with Id ${id} not found on the table`);
    table.splice(index, 1);
  });
  it("Insert", async () => {
    site1.id = await handler.insert(site1);
    site2.id = await handler.insert(site2);
    site3.id = await handler.insert(site3);
    const [first, second, thrid] = table;
    expect(first.name).toBe(site1.name);
    expect(second.name).toBe(site2.name);
    expect(thrid.name).toBe(site3.name);
  });
  it("Update site1", async () => {
    site1.name += " - UPDATED";
    site2.name += " - UPDATED";
    site3.name += " - UPDATED";
    const {
      cpf: site1Cpf,
      email: site1oEmail,
      birthDate: site1oBirthDate,
      gender: site1Gender,
      ...site1Payload
    } = site1;
    const {
      cpf: site2Cpf,
      email: site2Email,
      birthDate: site2BirthDate,
      gender: site2Gender,
      ...site2Payload
    } = site2;
    const {
      cpf: site3Cpf,
      email: site3Email,
      birthDate: site3BirthDate,
      gender: site3Gender,
      ...site3Payload
    } = site3;
    await handler.update(site1Payload);
    await handler.update(site2Payload);
    await handler.update(site3Payload);
    const [first, second, thrid] = table;
    expect(first.name).toBe(site1.name);
    expect(second.name).toBe(site2.name);
    expect(thrid.name).toBe(site3.name);
  });
  it("List test: limit 1 offset 0", async () => {
    const [first] = await handler.list({
      limit: 1
    });
    expect(first.name).toBe(site1.name);
  });
  it("List test: limit 2 offset 0", async () => {
    const [first, second] = await handler.list({
      limit: 2
    });
    expect(first.name).toBe(site1.name);
    expect(second.name).toBe(site2.name);
  });
  it("List test: limit 1 offset 2", async () => {
    const [thrid] = await handler.list({
      limit: 1,
      offset: 2
    });
    expect(thrid.name).toBe(site3.name);
  });
  it("Removing exists", async () => {
    await handler.remove({
      id: site1.id
    });
    expect(table.length).toBe(2);
    await handler.remove({
      id: site2.id
    });
    expect(table.length).toBe(1);
    await handler.remove({
      id: site3.id
    });
    expect(table.length).toBe(0);
  });
});
//# sourceMappingURL=index.test.js.map