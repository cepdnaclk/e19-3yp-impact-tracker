import app from "../../app";
import { HttpCode, HttpMsg } from "../exceptions/appErrorsDefine";
import request from "supertest";

describe("APP ROOT", () => {
  it("should return a 200 OK for the root endpoint", async () => {
    const response = await request(app)
      .get("/")
      .set("Accept", "application/json");

    expect(response.status).toBe(HttpCode.OK);
  });

  it("should return a 404 Not Found for an invalid endpoint", async () => {
    const response = await request(app)
      .get("/invalid")
      .set("Accept", "application/json");

    expect(response.status).toBe(HttpCode.UNAUTHORIZED);
  });
});
