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
 * Login Routes Test Suite
 *
 * 1. POST /login/manager - Login as a manager
 *    - Test scenario: Verifies that a manager can successfully log in with valid credentials.
 *
 * 2. POST /login/manager - Handle invalid manager login
 *    - Test scenario: Ensures that the server responds with a 400 Bad Request status when attempting to log in as a manager with invalid credentials.
 *
 * 3. POST /login/player - Login as a player
 *    - Test scenario: Verifies that a player can successfully log in with valid credentials.
 *
 * 4. POST /login/player - Handle invalid player login
 *    - Test scenario: Ensures that the server responds with a 400 Bad Request status when attempting to log in as a player with invalid credentials.
 *
 */

describe("Login Routes", () => {
  it("should login as a manager", async () => {
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

    const responseManager = await request(app)
      .post("/manager")
      .send(managerData)
      .set("Accept", "application/json");

    const managerCredentials = {
      userName: managerData.email,
      password: managerData.password,
    };

    const response = await request(app)
      .post("/login/manager")
      .send(managerCredentials)
      .set("Accept", "application/json");

    expect(response.status).toBe(HttpCode.OK);
    // You can customize the expectations based on the expected response for a successful manager login.
  });

  it("should return a 400 Bad Request for invalid manager login", async () => {
    const invalidManagerCredentials = {
      userName: "invalid.manager@example.com",
      password: "invalidPassword",
    };

    const response = await request(app)
      .post("/login/manager")
      .send(invalidManagerCredentials)
      .set("Accept", "application/json");

    expect(response.status).toBe(HttpCode.BAD_REQUEST);
    expect(response.body).toHaveProperty(
      "message",
      HttpMsg.AUTH_DOES_NOT_EXIST
    );
  });

  // it("should login as a player", async () => {
  //   const playerCredentials = {
  //     userName: "player@example.com",
  //     password: "securePassword",
  //   };

  //   const response = await request(app)
  //     .post("/login/player")
  //     .send(playerCredentials)
  //     .set("Accept", "application/json");

  //   expect(response.status).toBe(HttpCode.OK);
  //   // You can customize the expectations based on the expected response for a successful player login.
  // });

  //   it("should return a 400 Bad Request for invalid player login", async () => {
  //     const invalidPlayerCredentials = {
  //       userName: "invalid.player@example.com",
  //       password: "invalidPassword",
  //     };

  //     const response = await request(app)
  //       .post("/login/player")
  //       .send(invalidPlayerCredentials)
  //       .set("Accept", "application/json");

  //     expect(response.status).toBe(HttpCode.BAD_REQUEST);
  //     expect(response.body).toHaveProperty("message", HttpMsg.BAD_REQUEST);
  //   });

  // Add more test cases for other scenarios as needed
});
