const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");

const testUserData = [
  {
    email: "sanchos1337@sanchos1337.com",
    password: "Sanchos1337@£$",
  },
  {
    email: "sanchos1337@sanchos1337.com",
    password: "wrongpassword",
  },
];

beforeAll(async () => {
  await User.deleteMany({});
});

describe("User Routes", () => {
  describe("POST /api/users/register", () => {
    it("should signup a new user with valid credentials", async () => {
        const response = await api.post("/api/users/register").send(testUserData[0]);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("token");
    });

    it("should return error trying to signup with invalid credentials", async () => {
        const response = await api.post("/api/users/register").send(testUserData[1]);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");
    });
  });

  describe("POST /api/users/login", () => {
    it("should login with valid credentials", async () => {
        const response = await api.post("/api/users/login").send(testUserData[0]);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("token");
    });

    it("should return error trying to login with invalid credentials", async () => {
        const response = await api.post("/api/users/login").send(testUserData[1]);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});