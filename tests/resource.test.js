const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Resource = require("../models/waterModel");

const resources = [
  {
    date: "2021-10-10",
    amountInLiters: 10,
    comments: "I drank 10 liters of water today!",
  },
  {
    date: "2021-05-12",
    amountInLiters: 5,
    comments: "I drank 5 liters of water today!",
  },
];

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post("/api/users/register")
    .send({ email: "sanchos1337@sanchos1337.com", password: "12345ASDqwe@£$" });
  token = result.body.token;
});

describe("Given there is resource data in the database", () => {
  beforeEach(async () => {
    await Resource.deleteMany({});
    await api
      .post("/api/resources")
      .set("Authorization", "Bearer" + token)
      .send(resources[0])
      .send(resources[1]);
  });

  //GET ALL resource DATA
  it("should return all resource as JSON when GET /api/resources is called", async () => {
    await api
      .get("/api/resources")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

//ADD resource DATA
it("should create resource data when POST /api/resources is called", async () => {
  const resource = {
    date: "2004-10-10",
    amountInLiters: 13,
    comments: "I drank 13 liters of water today!",
  };
  await api
    .post("/api/resources")
    .set("Authorization", "bearer " + token)
    .send(resource)
    .expect(201);
});

//GET resource DATA BY ID
it("should return resource data by ID when GET /api/resources/:id is called", async () => {
  const resource = await Resource.findOne();
  await api
    .get("/api/resources/" + resource._id)
    .set("Authorization", "bearer " + token)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

//UPDATE resource data BY ID
it("should update one resource data by ID when PUT /api/resources/:id is called", async () => {
  const resource = await Resource.findOne();
  const updatedresource = {
    date: new Date(),
    amountInLiters: 10,
    comments: "updated comment",
  };
  await api
    .put("/api/resources/" + resource._id)
    .set("Authorization", "bearer " + token)
    .send(updatedresource)
    .expect(200);

  const updatedresourceCheck = await Resource.findById(resource._id);
  expect(updatedresourceCheck.toJSON()).toEqual(
    expect.objectContaining(updatedresource)
  );
});

//DELETE resource BY ID
it("should delete resource data by ID when DELETE api/resources/:id is called", async () => {
  const resource = await Resource.findOne();
  await api
    .delete("/api/resources/" + resource._id)
    .set("Authorization", "bearer " + token)
    .expect(200);
  const resourceCheck = await Resource.findById(resource._id);
  expect(resourceCheck).toBeNull();
});

afterAll(() => {
  mongoose.connection.close();
});
