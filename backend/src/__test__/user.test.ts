import request from "supertest";
import app from "../index"; // Assuming the Express app is exported from index.ts
import { faker } from "@faker-js/faker/.";
import prisma from "../prisma/prisma";
describe("User API", () => {
  // Before running the tests, clear the test database
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  // After tests complete, close the Prisma connection
  afterAll(async () => {
    await prisma.$disconnect();
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

  it("should not allow fetching users without authentication", async () => {
    const response = await request(app).get("/api/users").send();

    expect(response.status).toBe(401); // Unauthorized error
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

  it("should not fetch all users because not authorized as admin", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${authToken}`)
      .send();

    expect(response.status).toBe(401);
  });

  it("should make a user admin using Prisma", async () => {
    // Assume you have created a user with this email
    const user = await prisma.user.findUnique({
      where: { email: randomEmail },
    });

    expect(user).not.toBeNull();
    if (!user) throw new Error("User not found");

    // Make the user an admin
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { isAdmin: true },
    });

    expect(updatedUser.isAdmin).toBe(true); // Check if the user is now an admin
  });

  it("should fetch all users ", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${authToken}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should get the current user profile", async () => {
    const response = await request(app)
      .get("/api/users/profile")
      .set("Authorization", `Bearer ${authToken}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("email", randomEmail);
  });

  it("should update the current user profile", async () => {
    const response = await request(app)
      .put("/api/users/profile")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        email: randomEmail,
        name: randomName,
        password: randomPassword,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("email", randomEmail);
  });

  it("should delete a user by ID", async () => {
    const randomEmail = faker.internet.email(); // Generate a random email
    const randomPassword = faker.internet.password(); // Generate a random password
    const randomName = faker.name.fullName(); // Generate a random name
    // First, create a new user to delete
    const newUserResponse = await request(app).post("/api/users").send({
      email: randomEmail,
      password: randomPassword,
      name: randomName,
    });

    expect(newUserResponse.status).toBe(201);
    expect(newUserResponse.body).toHaveProperty("email", randomEmail);
    const userId = newUserResponse.body.id;

    const deleteResponse = await request(app)
      .delete(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toHaveProperty(
      "msg",
      "User deleted successfully"
    );
  });

  it("should return 404 if deleting a non-existent user", async () => {
    const response = await request(app)
      .delete("/api/users/9999") // Assuming this user doesn't exist
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(404);
  });
});
