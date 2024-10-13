import request from "supertest";
import app from "../index"; // Assuming the Express app is exported from index.ts
import prisma from "../prisma/prisma";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

// Load environment variables from the .env file
dotenv.config();

jest.mock("../modules/middlewares/authMiddleware", () => ({
  ...jest.requireActual("../modules/middlewares/authMiddleware"),
  authorizeAdmin: jest.fn((req: Request, res: Response, next: NextFunction) =>
    next()
  ),
}));
describe("Admin - Category API", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
    await prisma.category.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect(); // Close Prisma connection after tests
  });

  let authToken: string;

  const randomEmail = faker.internet.email();
  const randomPassword = faker.internet.password();
  const randomName = faker.person.fullName();

  it("should create a new user", async () => {
    const response = await request(app).post("/api/users").send({
      email: randomEmail,
      password: randomPassword,
      name: randomName,
    });

    expect(response.status).toBe(201);
    expect(response.body.email).toBe(randomEmail);
  });

  it("should log in the admin user and return a token", async () => {
    const loginResponse = await request(app).post("/api/auth/login").send({
      email: randomEmail,
      password: randomPassword,
    });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty("token");

    authToken = loginResponse.body.token; // Save the token for the admin user
  });

  it("should allow admin to create a new category", async () => {
    const response = await request(app)
      .post("/api/category")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ name: "Admin Test Category" });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Admin Test Category");
  });
});
