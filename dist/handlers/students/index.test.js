"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

require("dotenv/config");

var handler = _interopRequireWildcard(require("./index"));

var models = _interopRequireWildcard(require("~/models"));

var _login = require("~/handlers/oauth/login");

jest.mock("~/models/students");
jest.mock("~/handlers/oauth/login");
describe("Students tests", () => {
  const bob = {
    city: "SAO PAULO",
    cpf: "12345678909",
    email: "bob@contoso.com",
    name: "BOB ROBSON",
    state: "SP",
    gradeId: 1,
    isPublicSchool: true,
    schoolName: "ESCOLA MUNICIPAL SAO PAULINA",
    siteId: 36,
    birthDate: "2000-01-01T00:00:00.000Z",
    gender: "M",
    themes: "[1, 2]",
    workshops: "[3, 4]"
  };
  const alice = {
    city: "SAO PAULO",
    cpf: "01234567890",
    email: "bob@contoso.com",
    name: "ALICE WATSON",
    state: "SP",
    gradeId: 2,
    isPublicSchool: false,
    schoolName: "ESCOLA PARTICULAR SAO PAULINA",
    siteId: 36,
    birthDate: "1986-01-01T00:00:00.000Z",
    gender: "F",
    themes: "[5, 6]",
    workshops: "[7, 8]"
  };
  const trudy = {
    city: "SAO PAULO",
    cpf: "00123456797",
    email: "bob@contoso.com",
    name: "TRUDY NEWMAN",
    state: "SP",
    gradeId: 3,
    isPublicSchool: true,
    schoolName: "ESCOLA DESCONHECIDA",
    siteId: 36,
    birthDate: "1990-01-01T00:00:00.000Z",
    gender: "F",
    themes: "[9, 10]",
    workshops: "[11, 12]"
  };
  const table = [];

  _login.login.mockImplementation(async () => table.length);

  models.students.get.mockImplementation(async params => {
    const {
      query,
      limit,
      offset
    } = params;
    return table.filter(item => item.name.includes(query)).slice(offset, limit + offset);
  });
  models.students.list.mockImplementation(async params => {
    const {
      query,
      limit = 10,
      offset = 0
    } = params;
    if (query) return table.filter(item => item.name.includes(query)).slice(offset, limit + offset);
    return table.slice(offset, limit + offset);
  });
  models.students.insert.mockImplementation(async row => {
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
  models.students.update.mockImplementation(async row => {
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
  models.students.remove.mockImplementation(async row => {
    const {
      id
    } = row; // I want to keep the order of the array

    const index = table.findIndex(item => item.id === id);
    if (index < 0) throw new Error(`Item with Id ${id} not found on the table`);
    table.splice(index, 1);
  });
  it("Insert users", async () => {
    bob.id = await handler.insert(bob);
    alice.id = await handler.insert(alice);
    trudy.id = await handler.insert(trudy);
    const [first, second, thrid] = table;
    expect(first.name).toBe(bob.name);
    expect(second.name).toBe(alice.name);
    expect(thrid.name).toBe(trudy.name);
  });
  it("Update Bob", async () => {
    bob.name += " - UPDATED";
    alice.name += " - UPDATED";
    trudy.name += " - UPDATED";
    const {
      cpf: bobCpf,
      email: boboEmail,
      birthDate: boboBirthDate,
      gender: bobGender,
      ...bobPayload
    } = bob;
    const {
      cpf: aliceCpf,
      email: aliceEmail,
      birthDate: aliceBirthDate,
      gender: aliceGender,
      ...alicePayload
    } = alice;
    const {
      cpf: trudyCpf,
      email: trudyEmail,
      birthDate: trudyBirthDate,
      gender: trudyGender,
      ...trudyPayload
    } = trudy;
    await handler.update(bobPayload);
    await handler.update(alicePayload);
    await handler.update(trudyPayload);
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
      id: bob.id
    });
    expect(table.length).toBe(2);
    await handler.remove({
      id: alice.id
    });
    expect(table.length).toBe(1);
    await handler.remove({
      id: trudy.id
    });
    expect(table.length).toBe(0);
  });
});
//# sourceMappingURL=index.test.js.map