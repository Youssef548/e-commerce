import request from "supertest";
import app from "../index"; // Assuming the Express app is exported from index.ts
import prisma from "../prisma/prisma";
import { faker } from "@faker-js/faker"; // Import faker for random data
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

describe("User API", () => {
  // Before running the tests, clear the test database
  beforeAll(async () => {
    await prisma.user.deleteMany();
    await prisma.category.deleteMany();
  });

  let authToken: string;

  const randomEmail = faker.internet.email(); // Generate a random email
  const randomPassword = faker.internet.password(); // Generate a random password
  const randomName = faker.name.fullName(); // Generate a random name

  it("should create a new user", async () => {
    const response = await request(app).post("/api/users").send({
      email: randomEmail,
      password: randomPassword,
      name: randomName,
    });

    expect(response.status).toBe(201);
    expect(response.body.email).toBe(randomEmail);
  });

  it("should log in a user and return a token", async () => {
    const loginResponse = await request(app).post("/api/auth/login").send({
      email: randomEmail,
      password: randomPassword,
    });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty("token");

    authToken = loginResponse.body.token; // Store the token for subsequent requests
  });

  it("should create a new category", async () => {
    const response = await request(app)
      .post("/api/category")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ name: "HI TEST CAtegory welocme" });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("HI TEST CAtegory welocme");
  });
});
