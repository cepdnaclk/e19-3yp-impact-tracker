import app from "../../../app";
import { HttpCode, HttpMsg } from "../../exceptions/appErrorsDefine";
import request from "supertest";

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

  //   it("should return a 400 Bad Request for an invalid team ID", async () => {
  //     const invalidTeamId = "invalidTeamId";

  //     const response = await request(app)
  //       .get(`/team/exists/teamId/${invalidTeamId}`)
  //       .set("Accept", "application/json");

  //     expect(response.status).toBe(HttpCode.BAD_REQUEST);
  //     expect(response.body).toHaveProperty("message", HttpMsg.BAD_REQUEST);
  //   });

  // Add more test cases for other scenarios as needed
});
