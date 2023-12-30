import app from "../../app";
import { HttpCode, HttpMsg } from "../exceptions/appErrorsDefine";
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

    expect(response.status).toBe(HttpCode.NOT_FOUND);
  });
});
