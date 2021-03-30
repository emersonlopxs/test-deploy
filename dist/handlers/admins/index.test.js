"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

require("dotenv/config");

var handler = _interopRequireWildcard(require("./index"));

var models = _interopRequireWildcard(require("~/models"));

jest.mock("~/models/admins");
describe("Admins tests", () => {
  const bob = {
    name: "BOB ROBSON"
  };
  const alice = {
    name: "ALICE WATSON"
  };
  const trudy = {
    name: "TRUDY NEWMAN"
  };
  const table = [];
  models.admins.get.mockImplementation(async params => {
    const {
      query,
      limit,
      offset
    } = params;
    return table.filter(item => item.name.includes(query)).slice(offset, limit + offset);
  });
  models.admins.list.mockImplementation(async params => {
    const {
      query,
      limit = 10,
      offset = 0
    } = params;
    if (query) return table.filter(item => item.name.includes(query)).slice(offset, limit + offset);
    return table.slice(offset, limit + offset);
  });
  models.admins.insert.mockImplementation(async row => {
    const userId = table.length + 1;
    const createdAt = new Date();
    const modifiedAt = new Date();
    table.push({ ...row,
      userId,
      createdAt,
      modifiedAt
    });
    return userId;
  });
  models.admins.update.mockImplementation(async row => {
    const {
      userId
    } = row;
    const modifiedAt = new Date(); // I want to keep the order of the array

    const index = table.findIndex(item => item.userId === userId);
    if (index < 0) throw new Error(`Item with userId ${userId} not found on the table`);
    table[index] = { ...table[index],
      ...row,
      modifiedAt
    };
  });
  models.admins.remove.mockImplementation(async row => {
    const {
      userId
    } = row; // I want to keep the order of the array

    const index = table.findIndex(item => item.userId === userId);
    if (index < 0) throw new Error(`Item with userId ${userId} not found on the table`);
    table.splice(index, 1);
  });
  it("Insert", async () => {
    const email = "teste@email.com";
    const password = "1234abcd";
    bob.userId = await handler.insert({
      email,
      password,
      ...bob
    });
    alice.userId = await handler.insert({
      email,
      password,
      ...alice
    });
    trudy.userId = await handler.insert({
      email,
      password,
      ...trudy
    });
    const [first, second, thrid] = table;
    expect(first.name).toBe(bob.name);
    expect(second.name).toBe(alice.name);
    expect(thrid.name).toBe(trudy.name);
  });
  it("Update Bob", async () => {
    bob.name += " - UPDATED";
    alice.name += " - UPDATED";
    trudy.name += " - UPDATED";
    await handler.update({ ...bob
    });
    await handler.update({ ...alice
    });
    await handler.update({ ...trudy
    });
    const [first, second, thrid] = table;
    expect(first.name).toBe(bob.name);
    expect(second.name).toBe(alice.name);
    expect(thrid.name).toBe(trudy.name);
  });
  it("List test: limit 1 offset 0", async () => {
    const [first] = await handler.list({
      limit: 1
    });
    expect(first.name).toBe(bob.name);
  });
  it("List test: limit 2 offset 0", async () => {
    const [first, second] = await handler.list({
      limit: 2
    });
    expect(first.name).toBe(bob.name);
    expect(second.name).toBe(alice.name);
  });
  it("List test: limit 1 offset 2", async () => {
    const [thrid] = await handler.list({
      limit: 1,
      offset: 2
    });
    expect(thrid.name).toBe(trudy.name);
  });
  it("Removing exists", async () => {
    await handler.remove({
      userId: bob.userId
    });
    expect(table.length).toBe(2);
    await handler.remove({
      userId: alice.userId
    });
    expect(table.length).toBe(1);
    await handler.remove({
      userId: trudy.userId
    });
    expect(table.length).toBe(0);
  });
});
//# sourceMappingURL=index.test.js.map