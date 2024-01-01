import app from "../../../app";
import { HttpCode, HttpMsg } from "../../exceptions/appErrorsDefine";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

beforeAll(async () => {
  // Create a in memory server
  const mongoServer = await MongoMemoryServer.create();
  // Get the connection string
  const mongoUri = mongoServer.getUri();
  // Connect to the in memory server

  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to in-memory database");
  } catch (err) {
    console.error(err);
  }
});

afterAll(async () => {
  await mongoose.disconnect();
});

/**
 * Manager Routes Test Suite
 *
 * 1. POST /manager - Create a new manager
 *    - Test scenario: Verifies that a new manager can be successfully created with valid data.
 *
 * 2. POST /manager - Handle invalid manager data
 *    - Test scenario: Ensures that the server responds with a 400 Bad Request status when attempting to create a manager with missing required fields.
 *
 * 3. GET /manager/exists/email/:email - Check if a manager email exists
 *    - Test scenario: Validates that the server correctly identifies the existence of a manager by email.
 *
 * 4. GET /manager/exists/email/:email - Handle invalid manager email
 *    - Test scenario: Confirms that the server responds with a 400 Bad Request status when checking the existence of a manager with an invalid email.
 *
 */

describe("Manager Routes", () => {
  it("should create a new manager", async () => {
    const teamData = {
      teamId: "exampleTeamId",
      teamName: "Example Team",
    };

    const responseTeam = await request(app)
      .post("/team")
      .send(teamData)
      .set("Accept", "application/json");

    const managerData = {
      teamId: "exampleTeamId",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "securePassword",
    };

    const response = await request(app)
      .post("/manager")
      .send(managerData)
      .set("Accept", "application/json");

    expect(response.status).toBe(HttpCode.OK);
    expect(response.body).toHaveProperty("teamId", managerData.teamId);
    expect(response.body).toHaveProperty("firstName", managerData.firstName);
    expect(response.body).toHaveProperty("lastName", managerData.lastName);
    expect(response.body).toHaveProperty("email", managerData.email);
  });

  it("should return a 400 Bad Request for invalid manager data", async () => {
    const invalidManagerData = {
      // Missing required fields
    };

    const response = await request(app)
      .post("/manager")
      .send(invalidManagerData)
      .set("Accept", "application/json");

    expect(response.status).toBe(HttpCode.BAD_REQUEST);
    expect(response.body).toHaveProperty("message", HttpMsg.BAD_REQUEST);
  });

  it("should check if a manager email exists", async () => {
    const existingManagerEmail = "john.doe@example.com";

    const response = await request(app)
      .get(`/manager/exists/email/${existingManagerEmail}`)
      .set("Accept", "application/json");

    expect(response.status).toBe(HttpCode.OK);
    expect(response.body).toHaveProperty("managerExists", true);
  });

  it("should return a 400 Bad Request for an invalid manager email", async () => {
    const invalidManagerEmail = "invalid.email@example";

    const response = await request(app)
      .get(`/manager/exists/email/${invalidManagerEmail}`)
      .set("Accept", "application/json");

    expect(response.status).toBe(HttpCode.BAD_REQUEST);
    expect(response.body).toHaveProperty("message", HttpMsg.INVALID_EMAIL);
  });

  // Add more test cases for other scenarios as needed
});
