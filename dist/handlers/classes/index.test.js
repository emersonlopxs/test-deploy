"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

require("dotenv/config");

var handler = _interopRequireWildcard(require("./index"));

var models = _interopRequireWildcard(require("~/models"));

jest.mock("~/models/classes");
describe("Classes tests", () => {
  const exemplo1 = {
    title: "Physics classroom",
    contents: [{
      description: "How gravity works",
      thumbnail: "https://cdn.cnn.com/cnnnext/dam/assets/190623172519-turkey-ekrem-imamoglu-super-tease.jpg",
      type: "1",
      url: "https://www.youtube.com/watch?v=CWklXPu6MIM",
      isMain: 1
    }],
    gradeId: 1,
    classType: 1,
    subjectId: 1,
    classes: []
  };
  const exemplo2 = {
    title: "Math classroom",
    contents: [{
      description: "Plane geometry",
      thumbnail: "https://www.mathsisfun.com/geometry/plane-geometry.html",
      type: "2",
      url: "https://www.youtube.com/watch?v=MD1Ob370TIA",
      isMain: 1
    }],
    gradeId: 1,
    classType: 2,
    themeId: 1,
    classes: []
  };
  const exemplo3 = {
    title: "History class",
    contents: [{
      description: "Dallas historical events",
      thumbnail: "https://www.onthisday.com/countries/usa/texas/dallas",
      type: "3",
      url: "https://www.youtube.com/watch?v=TOwlDBhWvIw",
      isMain: 1
    }],
    gradeId: 1,
    classType: 3,
    workshopId: 1,
    classes: []
  };
  const exemplo4 = {
    gradeId: 2,
    classType: 1,
    themeId: null,
    workshopId: null,
    themeName: null,
    workshopName: null,
    classId: 2671,
    subjectId: 10,
    classTitle: "Physics classroom",
    subjectName: "Physic",
    contentDescription: "How gravity works",
    contentId: 2728,
    contentUrl: "https://www.youtube.com/embed/JjSxDPV0bqo",
    contentType: "youtube",
    contentThumbnail: "https://i.ytimg.com/vi/JjSxDPV0bqo/maxresdefault.jpg",
    teacherId: 124,
    teacherUserId: 494,
    teacherName: "Teste"
  };
  const exemplo5 = {
    gradeId: 2,
    classType: 1,
    themeId: null,
    workshopId: null,
    themeName: null,
    workshopName: null,
    classId: 2672,
    subjectId: 10,
    classTitle: "Math classroom",
    subjectName: "Math",
    contentDescription: "How gravity works",
    contentId: 2728,
    contentUrl: "Plane geometry",
    contentType: "youtube",
    contentThumbnail: "https://i.ytimg.com/vi/JjSxDPV0bqo/maxresdefault.jpg",
    teacherId: 124,
    teacherUserId: 494,
    teacherName: "Teste"
  };
  const exemplo6 = {
    gradeId: 2,
    classType: 1,
    themeId: null,
    workshopId: null,
    themeName: null,
    workshopName: null,
    classId: 2673,
    subjectId: 10,
    classTitle: "History class",
    subjectName: "History",
    contentDescription: "Dallas historical events",
    contentId: 2728,
    contentUrl: "https://www.youtube.com/embed/JjSxDPV0bqo",
    contentType: "youtube",
    contentThumbnail: "https://i.ytimg.com/vi/JjSxDPV0bqo/maxresdefault.jpg",
    teacherId: 124,
    teacherUserId: 494,
    teacherName: "Teste"
  };
  const table = [];
  const tableWithContents = [exemplo4, exemplo5, exemplo6];
  models.classes.get.mockImplementation(async params => {
    const {
      id
    } = params;
    return table.filter(item => item.id.includes(id));
  });
  models.classes.list.mockImplementation(async params => {
    const {
      filters,
      limit = 10,
      offset = 0
    } = params;
    if (filters) return table.filter(item => item.title.includes(filters)).slice(offset, limit + offset);
    return table.slice(offset, limit + offset);
  });
  models.classes.listWithContent.mockImplementation(async params => {
    const {
      filters,
      limit = 10,
      offset = 0
    } = params;
    if (filters) return {
      offset,
      limit,
      rows: tableWithContents.filter(item => item.classTitle.includes(filters)).slice(offset, limit + offset)
    }; // return tableWithContents.slice(offset, limit + offset);

    return {
      offset,
      limit,
      rows: tableWithContents.slice(offset, limit + offset)
    };
  });
  models.classes.insert.mockImplementation(async row => {
    const {
      classId
    } = row;
    table.push({
      id: table.length + 1,
      ...row
    });
    return classId;
  });
  models.classes.approve.mockImplementation(async row => {
    const {
      id,
      userid
    } = row;
    const modifiedAt = new Date(); // I want to keep the order of the array

    const index = table.findIndex(item => item.id === id);
    if (index < 0) throw new Error(`Item with Id ${id} not found on the table`);
    table[index] = { ...table[index],
      approvedBy: userid,
      approvedAt: new Date(),
      modifiedAt
    };
  });
  models.classes.remove.mockImplementation(async row => {
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
    expect(first.title).toBe(exemplo1.title);
    expect(second.title).toBe(exemplo2.title);
    expect(thrid.title).toBe(exemplo3.title);
  });
  it("Approve exemplos", async () => {
    await handler.approve({
      id: 1,
      userid: 10
    });
    await handler.approve({
      id: 2,
      userid: 11
    });
    await handler.approve({
      id: 3,
      userid: 12
    });
    const [first, second, thrid] = table;
    expect(first.approvedBy).toBe(10);
    expect(second.approvedBy).toBe(11);
    expect(thrid.approvedBy).toBe(12);
  });
  it("List test: limit 1 offset 0", async () => {
    const [first] = await handler.list({
      limit: 1
    });
    expect(first.title).toBe(exemplo1.title);
  });
  it("List test: limit 2 offset 0", async () => {
    const [first, second] = await handler.list({
      limit: 2
    });
    expect(first.title).toBe(exemplo1.title);
    expect(second.title).toBe(exemplo2.title);
  });
  it("List test: limit 1 offset 2", async () => {
    const [thrid] = await handler.list({
      limit: 1,
      offset: 2
    });
    expect(thrid.title).toBe(exemplo3.title);
  });
  it("List test: limit 1 offset 0", async () => {
    const {
      rows: [first]
    } = await handler.listWithContent({
      limit: 1
    });
    expect(first.title).toBe(exemplo4.classTitle);
  });
  it("List test: limit 2 offset 0", async () => {
    const {
      rows: [, second]
    } = await handler.listWithContent({
      limit: 2
    });
    expect(second.title).toBe(exemplo5.classTitle);
  });
  it("List test: limit 3 offset 0", async () => {
    const {
      rows: [,, thrid]
    } = await handler.listWithContent({
      limit: 3
    });
    expect(thrid.title).toBe(exemplo6.classTitle);
  });
  it("Removing exists", async () => {
    await handler.remove({
      id: 1
    });
    expect(table.length).toBe(2);
    await handler.remove({
      id: 2
    });
    expect(table.length).toBe(1);
    await handler.remove({
      id: 3
    });
    expect(table.length).toBe(0);
  });
});
//# sourceMappingURL=index.test.js.map