const mongoose = require("mongoose");
const supertest = require("supertest");
const { createServer } = require('../utility/server');
const constants = require('./constants');
const app = createServer()
const { setupDB } = require("./testSetup");

setupDB()

describe("health-check", () => {
    it("GET /api/health-check", async () => {
        await supertest(app).get("/api/health-check")
        .expect(200)
        .then((response) => {
          expect(response.body.message).toEqual('Ok');
          expect(response.body).toEqual(
              expect.objectContaining({
                message: 'Ok',
                uptime: expect.any(Number),
                timestamp: expect.any(Number),
              }),
            );
        });
    })
    it("POST /api/health-check", async () => {
        await supertest(app).post("/api/health-check")
        .expect(404)
    })
})
