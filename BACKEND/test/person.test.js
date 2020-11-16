const personRouter = require("../routes/personRouter");
const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/v1/persons", personRouter);

let testPersons;

describe("testing-person-routes", () => {
  //CREATE CHILD ENDPOINT
  it("POST /api/v1/persons - success", async () => {
    let person = {
      fullname: "Child test full name",
      birth: "1999/09/20",
    };
    const { body } = await request(app).post("/api/v1/persons").send(person);
    person.birth = new Date(person.birth).toISOString();
    expect(body).toMatchObject({
      status: "success",
      created: person,
    });
  });

  //CREATE FATHER ENDPOINT
  it("POST /api/v1/persons - success", async () => {
    let person = {
      fullname: "Father test full name",
      birth: "1956/09/05",
    };
    const { body } = await request(app).post("/api/v1/persons").send(person);
    person.birth = new Date(person.birth).toISOString();
    expect(body).toMatchObject({
      status: "success",
      created: person,
    });
  });

  //CREATE MOTHER ENDPOINT
  it("POST /api/v1/persons - success", async () => {
    let person = {
      fullname: "Mother test full name",
      birth: "1974/09/06",
    };
    const { body } = await request(app).post("/api/v1/persons").send(person);
    person.birth = new Date(person.birth).toISOString();
    expect(body).toMatchObject({
      status: "success",
      created: person,
    });
  });

  //GET ALL ENDPOINT
  it("GET /api/v1/persons - success", async () => {
    const { body } = await request(app).get("/api/v1/persons");
    expect(body).toMatchObject({
      status: "success",
      results: 3,
      data: [
        {
          fullname: "Child test full name",
          birth: new Date("1999/09/20").toISOString(),
        },
        {
          fullname: "Father test full name",
          birth: new Date("1956/09/05").toISOString(),
        },
        {
          fullname: "Mother test full name",
          birth: new Date("1974/09/06").toISOString(),
        },
      ],
    });
    testPersons = body.data;
  });

  //GET BY ID ENDPOINT
  it("GET /api/v1/persons/1 - success", async () => {
    const { body } = await request(app).get(`/api/v1/persons/${testPersons[0].id}`);
    expect(body).toMatchObject({
      status: "success",
      data: testPersons[0],
    });
  });

  //FATHER ADOPT BY ID ENDPOINT
  it("GET /api/v1/persons/2/adoptLikeFather/1 - success", async () => {
    const { body } = await request(app).patch("/api/v1/persons/2/adoptLikeFather/1");
    testPersons[0].father = 2;
    expect(body).toMatchObject({
      status: "success",
      father: testPersons[1],
      adopted: testPersons[0],
    });
  });

  //MOTHER ADOPT BY ID ENDPOINT
  it("GET /api/v1/persons/3/adoptLikeMother/1 - success", async () => {
    const { body } = await request(app).patch("/api/v1/persons/3/adoptLikeMother/1");
    testPersons[0].mother = 3;
    expect(body).toMatchObject({
      status: "success",
      mother: testPersons[2],
      adopted: testPersons[0],
    });
  });
});
