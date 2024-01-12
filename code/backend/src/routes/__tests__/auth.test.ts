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

describe("Refresh Token Endpoint", () => {
  it("should refresh access token successfully", async () => {
    const teamData = {
      teamId: "exampleTeamIdWithManager",
      teamName: "Example Team With Manager",
      email: "manager@example.com",
      firstName: "John",
      lastName: "Doe",
      password: "securePassword",
    };

    const team = await request(app)
      .post("/team/manager")
      .send(teamData)
      .set("Accept", "application/json");

    const managerCredentials = {
      userName: teamData.email,
      password: teamData.password,
      teamId: teamData.teamId,
    };

    const tokens = await request(app)
      .post("/login/manager")
      .send(managerCredentials)
      .set("Accept", "application/json");

    // Assume you have a valid refreshToken that needs to be refreshed
    const refreshToken = tokens.body.refreshToken;

    const response = await request(app)
      .get("/auth")
      .set("Authorization", `Bearer ${refreshToken}`)
      .set("Accept", "application/json");

    expect(response.status).toBe(HttpCode.OK);
    expect(response.body).toHaveProperty("accessToken");
    // Add more assertions based on the expected response
  });

  it("should return 401 Unauthorized for an invalid refreshToken", async () => {
    const invalidRefreshToken = "invalidRefreshToken";

    const response = await request(app)
      .get("/auth")
      .set("Authorization", `Bearer ${invalidRefreshToken}`)
      .set("Accept", "application/json");

    expect(response.status).toBe(HttpCode.UNAUTHORIZED);
    // Add more assertions based on the expected response
  });

  it("should return 400 Bad Request for missing refreshToken", async () => {
    const response = await request(app)
      .get("/refresh-token")
      .set("Accept", "application/json");

    expect(response.status).toBe(HttpCode.UNAUTHORIZED);
    // Add more assertions based on the expected response
  });

  // Add more test cases for other scenarios as needed
});
