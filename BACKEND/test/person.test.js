const personRouter = require("../routes/personRouter");
const request = require("supertest");
const express = require("express");
const dotenv = require("dotenv");
const db = require("../models");
const app = express();

db.sequelize.sync({ force: true });

dotenv.config({
  path: "./config.env",
});

app.use(express.json());

app.use("/api/v1/persons", personRouter);

let testPersons;

describe("testing-person-routes", () => {
  //INIT
  it("GET Initializing Database Connection", async () => {
    await request(app).get("/api/v1/persons");
    await request(app).get("/api/v1/persons/1");
    await request(app).get("/api/v1/persons");
    await request(app).get("/api/v1/persons/2");
    expect(1).toEqual(1);
  });

  //GET ALL EMPTY
  it("GET All - Empty", async () => {
    const { body } = await request(app).get("/api/v1/persons");
    expect(body).toEqual({
      status: "success",
      results: 0,
      data: [],
    });
  });

  //CREATE FIRST PERSON ENDPOINT
  it("POST First Person", async () => {
    let person = {
      cc: 1010101010,
      fullname: "First Person Full Name",
      birth: "1999/09/20",
    };
    const { body } = await request(app).post("/api/v1/persons").send(person);
    person.birth = new Date(person.birth).toISOString();
    expect(body).toMatchObject({
      status: "success",
      created: person,
    });
  });

  //CREATE SECOND PERSON ENDPOINT
  it("POST Second Person", async () => {
    let person = {
      cc: 1010101011,
      fullname: "Second Person Full Name",
      birth: "1956/09/05",
    };
    const { body } = await request(app).post("/api/v1/persons").send(person);
    person.birth = new Date(person.birth).toISOString();
    expect(body).toMatchObject({
      status: "success",
      created: person,
    });
  });

  //CREATE THIRD PERSON ENDPOINT
  it("POST Third Person", async () => {
    let person = {
      cc: 1010101012,
      fullname: "Third Person Full Name",
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
  it("GET ALL 3 persons", async () => {
    const { body } = await request(app).get("/api/v1/persons");
    expect(body).toMatchObject({
      status: "success",
      results: 3,
      data: [
        {
          cc: 1010101010,
          fullname: "First Person Full Name",
          birth: new Date("1999/09/20").toISOString(),
        },
        {
          cc: 1010101011,
          fullname: "Second Person Full Name",
          birth: new Date("1956/09/05").toISOString(),
        },
        {
          cc: 1010101012,
          fullname: "Third Person Full Name",
          birth: new Date("1974/09/06").toISOString(),
        },
      ],
    });
    testPersons = body.data;
  });

  //GET BY ID ENDPOINTS
  it("GET BY ID First Person", async () => {
    const { body } = await request(app).get(`/api/v1/persons/${testPersons[0].id}`);
    expect(body).toMatchObject({
      status: "success",
      data: testPersons[0],
    });
  });

  it("GET BY ID Second Person", async () => {
    const { body } = await request(app).get(`/api/v1/persons/${testPersons[1].id}`);
    expect(body).toMatchObject({
      status: "success",
      data: testPersons[1],
    });
  });

  it("GET BY ID Third Person", async () => {
    const { body } = await request(app).get(`/api/v1/persons/${testPersons[2].id}`);
    expect(body).toMatchObject({
      status: "success",
      data: testPersons[2],
    });
  });
});
