const supertest = require("supertest");
const { createServer } = require("../utility/server");
const app = createServer();
const mongoose = require("mongoose");
const constants = require("./constants");
const { getDashboard } = require("../modules/dashboard/controller");
const timePeriod = require("../modules/timeperiod/model");
const { setupDB } = require("./testSetup");

setupDB()


describe("dashboard api test", () => {
    var auth_token;
    res = {}
    const quarter_id = constants.quarter_id;
    it("POST /api/auth/login", async () => {
        await supertest(app).post("/api/auth/login/").send(constants.user_data)
        .expect(200)
        .then((response) => {
            auth_token = response.body.data.accessToken;
            expect(response.body.status).toEqual("success");
            expect(response.body.message).toEqual("Logged-In Successfully!");
            expect(response.body.data).toEqual(
              expect.objectContaining({
                accessToken: expect.any(String),
              }),
            );
        });
    })
    it("GET /api/dashboard?quarter= (with quarter)", async () => {
        const headers = {
            "x-access-token": auth_token
        }
        await supertest(app).get(`/api/dashboard?quarter=${quarter_id}`).set(headers)
        .expect(200)
        .then((response) => {
            expect(response.body.status).toEqual("success");
            expect(response.body.data).toEqual(
              expect.objectContaining({
                totalObjective: expect.any(Number),
                objectiveDone: expect.any(Number),
                objectiveAtRisk: expect.any(Number),
                objectiveBehind: expect.any(Number),
                objectiveOnTrack: expect.any(Number),
                totalKrs: expect.any(Number),
                krDone: expect.any(Number),
                krAtRisk: expect.any(Number),
                krBehind: expect.any(Number),
                krOnTrack: expect.any(Number),
                overallProgress: expect.any(Number),
                overallStatus: expect.any(String)
              }),
            );
        })
    })
    it("GET /api/dashboard?quarter= (with wrong quarter)", async () => {
        const headers = {
            "x-access-token": auth_token
        }
        await supertest(app).get(`/api/dashboard?quarter=${quarter_id}0000`).set(headers)
        .expect(400)
        .then((response) => {
            expect(response.body.status).toEqual("failure");
            expect(response.body.message).toEqual("Invalid Quarter id Provided");
        })
    })
    it("GET /api/dashboard (without quarter)", async () => {
        const headers = {
            "x-access-token": auth_token
        }
        await supertest(app).get(`/api/dashboard`).set(headers)
        .expect(400)
        .then((response) => {
            expect(response.body.status).toEqual("failure");
            expect(response.body.message).toEqual("Time Period Doesn't Exist");
        })
    })
    it("GET /api/dashboard/company (with quarter)", async () => {
        const headers = {
            "x-access-token": auth_token
        }
        await supertest(app).get(`/api/dashboard/company?quarter=${quarter_id}`).set(headers)
        .expect(200)
        .then((response) => {
            expect(response.body.status).toEqual("success");
            expect(response.body.data).toEqual(
              expect.objectContaining({
                totalObjective: expect.any(Number),
                objectiveDone: expect.any(Number),
                objectiveAtRisk: expect.any(Number),
                objectiveBehind: expect.any(Number),
                objectiveOnTrack: expect.any(Number),
                totalKrs: expect.any(Number),
                krDone: expect.any(Number),
                krAtRisk: expect.any(Number),
                krBehind: expect.any(Number),
                krOnTrack: expect.any(Number),
                overallProgress: expect.any(Number),
                overallStatus: expect.any(String)
              }),
            );
        })
    })
    it("GET /api/dashboard/company (with wrong quarter)", async () => {
        const headers = {
            "x-access-token": auth_token
        }
        await supertest(app).get(`/api/dashboard/company?quarter=${quarter_id}0000`).set(headers)
        .expect(400)
        .then((response) => {
            expect(response.body.status).toEqual("failure");
            expect(response.body.message).toEqual("Invalid Quarter id Provided");
        })
    })
    it("GET /api/dashboard/company (without quarter)", async () => {
        const headers = {
            "x-access-token": auth_token
        }
        await supertest(app).get(`/api/dashboard/company`).set(headers)
        .expect(400)
        .then((response) => {
            expect(response.body.status).toEqual("failure");
            expect(response.body.message).toEqual("Time Period Doesn't Exist");
        })
    })
    it("GET /api/dashboard/company (with quarter)", async () => {
        const headers = {
            "x-access-token": auth_token
        }
        timePeriod.findOne = jest.fn().mockImplementation(() => {
          throw new Error();
        });
        await supertest(app).get(`/api/dashboard/company?quarter=${quarter_id}`).set(headers)
        .expect(400)
        .then((response) => {
            expect(response.body.status).toEqual("failure");
            expect(response.body.message).toEqual("Time Period Doesn't Exist");
        })
    })
        it("GET /api/dashboard?quarter= (with quarter)", async () => {
        const headers = {
            "x-access-token": auth_token
        }
        timePeriod.findOne = jest.fn().mockImplementation(() => {
          throw new Error();
        });
        await supertest(app).get(`/api/dashboard?quarter=${quarter_id}`).set(headers)
        .expect(400)
        .then((response) => {
            expect(response.body.status).toEqual("failure");
            expect(response.body.message).toEqual("Time Period Doesn't Exist");
        })
    })
    it("GET /api/dashboard/company (with quarter)", async () => {
        const headers = {
            "x-access-token": auth_token
        }
        timePeriod.findOne = jest.fn().mockImplementation(() => {
          throw new Error();
        });
        await supertest(app).get(`/api/dashboard/company?quarter=${quarter_id}`).set(headers)
        .expect(400)
        .then((response) => {
            expect(response.body.status).toEqual('failure');
            expect(response.body.message).toEqual("Time Period Doesn't Exist");
        })
    })
        it("GET /api/dashboard?quarter= (with quarter)", async () => {
        const headers = {
            "x-access-token": auth_token
        }
        timePeriod.findOne = jest.fn().mockImplementation(() => {
          throw new Error();
        });
        await supertest(app).get(`/api/dashboard?quarter=${quarter_id}`).set(headers)
        .expect(400)
        .then((response) => {
            expect(response.body.status).toEqual('failure');
            expect(response.body.message).toEqual("Time Period Doesn't Exist");
        })
    })
})