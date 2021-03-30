"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

require("dotenv/config");

var handler = _interopRequireWildcard(require("./index"));

var models = _interopRequireWildcard(require("~/models"));

jest.mock("~/models/grades");
describe("Mentors tests", () => {
  const exemplo1 = {
    name: "1º Ano Médio"
  };
  const exemplo2 = {
    name: "3º Ano Médio"
  };
  const exemplo3 = {
    name: "9º Ano Fundamental"
  };
  const table = [];
  models.grades.get.mockImplementation(async params => {
    const {
      query,
      limit,
      offset
    } = params;
    return table.filter(item => item.name.includes(query)).slice(offset, limit + offset);
  });
  models.grades.list.mockImplementation(async params => {
    const {
      query,
      limit = 10,
      offset = 0
    } = params;
    if (query) return table.filter(item => item.name.includes(query)).slice(offset, limit + offset);
    return table.slice(offset, limit + offset);
  });
  models.grades.insert.mockImplementation(async row => {
    const id = table.length + 1;
    const userId = id * 10;
    const createdAt = new Date();
    const modifiedAt = new Date();
    table.push({ ...row,
      id,
      userId,
      createdAt,
      modifiedAt
    });
    return id;
  });
  models.grades.update.mockImplementation(async row => {
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
  models.grades.remove.mockImplementation(async row => {
    const {
      id
    } = row; // I want to keep the order of the array

    const index = table.findIndex(item => item.id === id);
    if (index < 0) throw new Error(`Item with Id ${id} not found on the table`);
    table.splice(index, 1);
  });
  it("Insert", async () => {
    exemplo1.id = await handler.insert(exemplo1);
    exemplo2.id = await handler.insert(exemplo2);
    exemplo3.id = await handler.insert(exemplo3);
    const [first, second, thrid] = table;
    expect(first.name).toBe(exemplo1.name);
    expect(second.name).toBe(exemplo2.name);
    expect(thrid.name).toBe(exemplo3.name);
  });
  it("Update exemplos", async () => {
    await handler.update({ ...exemplo1
    });
    await handler.update({ ...exemplo2
    });
    await handler.update({ ...exemplo3
    });
    const [first, second, thrid] = table;
    expect(first.name).toBe(exemplo1.name);
    expect(second.name).toBe(exemplo2.name);
    expect(thrid.name).toBe(exemplo3.name);
  });
  it("List test: limit 1 offset 0", async () => {
    const [first] = await handler.list({
      limit: 1
    });
    expect(first.name).toBe(exemplo1.name);
  });
  it("List test: limit 2 offset 0", async () => {
    const [first, second] = await handler.list({
      limit: 2
    });
    expect(first.name).toBe(exemplo1.name);
    expect(second.name).toBe(exemplo2.name);
  });
  it("List test: limit 1 offset 2", async () => {
    const [thrid] = await handler.list({
      limit: 1,
      offset: 2
    });
    expect(thrid.name).toBe(exemplo3.name);
  });
  it("Removing exists", async () => {
    await handler.remove({
      id: exemplo1.id
    });
    expect(table.length).toBe(2);
    await handler.remove({
      id: exemplo2.id
    });
    expect(table.length).toBe(1);
    await handler.remove({
      id: exemplo3.id
    });
    expect(table.length).toBe(0);
  });
});
//# sourceMappingURL=index.test.js.map