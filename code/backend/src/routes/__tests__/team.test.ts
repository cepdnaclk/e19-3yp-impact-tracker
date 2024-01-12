import app from "../../../app";
import { HttpCode, HttpMsg } from "../../exceptions/http.codes.mgs";
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
 * Team Routes Test Suite
 *
 * 1. POST /team - Create a new team
 *    - Test scenario: Verifies that a new team can be successfully created with valid data.
 *
 * 2. POST /team - Handle invalid team data
 *    - Test scenario: Ensures that the server responds with a 400 Bad Request status when attempting to create a team with missing required fields.
 *
 * 3. GET /team/exists/teamId/:id - Check if a team ID exists
 *    - Test scenario: Validates that the server correctly identifies the existence of a team by ID.
 *
 * 4. GET /team/exists/teamId/:id - Handle invalid team ID
 *    - Test scenario: Confirms that the server responds with a 400 Bad Request status when checking the existence of a team with an invalid ID.
 */

describe("Team Routes", () => {
  it("should create a new team", async () => {
    const teamData = {
      teamId: "exampleTeamId",
      teamName: "Example Team",
    };

    const response = await request(app)
      .post("/team")
      .send(teamData)
      .set("Accept", "application/json");

    expect(response.status).toBe(HttpCode.OK);
    expect(response.body).toHaveProperty("teamId", teamData.teamId);
    expect(response.body).toHaveProperty("teamName", teamData.teamName);
  });

  it("should return a 400 Bad Request for invalid team data", async () => {
    const invalidTeamData = {
      // Missing required fields
    };

    const response = await request(app)
      .post("/team")
      .send(invalidTeamData)
      .set("Accept", "application/json");

    expect(response.status).toBe(HttpCode.BAD_REQUEST);
    expect(response.body).toHaveProperty("message", HttpMsg.BAD_REQUEST);
  });

  it("should check if a team ID exists", async () => {
    const existingTeamId = "exampleTeamId";

    const response = await request(app)
      .get(`/team/exists/teamId/${existingTeamId}`)
      .set("Accept", "application/json");

    expect(response.status).toBe(HttpCode.OK);
    expect(response.body).toHaveProperty("teamExists", true);
  });

  it("should return a 400 Bad Request for an invalid team ID", async () => {
    const invalidTeamId = "invalidTeamId";

    const response = await request(app)
      .get(`/team/exists/teamId/${invalidTeamId}`)
      .set("Accept", "application/json");

    expect(response.status).toBe(HttpCode.OK);
    expect(response.body.teamExists).toBe(false);
  });

  it("should return a 400 Bad Request for an invalid team ID format", async () => {
    const invalidTeamId = "invalid@TeamId";

    const response = await request(app)
      .get(`/team/exists/teamId/${invalidTeamId}`)
      .set("Accept", "application/json");

    expect(response.status).toBe(HttpCode.OK);
    expect(response.body.teamExists).toBe(false);
  });

  it("should create a new team with a manager", async () => {
    const teamData = {
      teamId: "exampleTeamIdWithManager",
      teamName: "Example Team With Manager",
      email: "manager@example.com",
      firstName: "John",
      lastName: "Doe",
      password: "securePassword",
    };

    const response = await request(app)
      .post("/team/manager")
      .send(teamData)
      .set("Accept", "application/json");

    expect(response.status).toBe(HttpCode.OK);
    expect(response.body).toHaveProperty("teamId", teamData.teamId);
    expect(response.body).toHaveProperty("email", teamData.email);
    // Add more assertions based on the expected response
  });

  it("should return a 400 Bad Request if manager already exists in the team", async () => {
    const existingTeamId = "exampleTeamId";
    const existingManagerEmail = "manager@example.com";

    const response = await request(app)
      .post("/team/manager")
      .send({
        teamId: "existingTeamId",
        teamName: "Existing Team",
        email: "manager@example.com",
        firstName: "Jane",
        lastName: "Smith",
        password: "anotherPassword",
      })
      .set("Accept", "application/json");

    const responseSecond = await request(app)
      .post("/team/manager")
      .send({
        teamId: "existingTeamId",
        teamName: "Existing Team",
        email: "manager@example.com",
        firstName: "Jane",
        lastName: "Smith",
        password: "anotherPassword",
      })
      .set("Accept", "application/json");

    expect(responseSecond.status).toBe(HttpCode.BAD_REQUEST);
    expect(responseSecond.body).toHaveProperty(
      "message",
      HttpMsg.INVALID_TEAMID
    );
  });
});
