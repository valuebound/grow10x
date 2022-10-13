const supertest = require("supertest");
const { createServer } = require("../utility/server");
const app = createServer();
const mongoose = require("mongoose");
const constants = require("./constants");
const User = require("../modules/user/model");
const ActivityFeed = require("../modules/activityFeed/model");
const { setupDB } = require("./testSetup");

setupDB()


describe("activity-feed test", () => {
    var auth_token;
    res = {}
    it("POST /api/auth/login", async () => {
        await supertest(app).post("/api/auth/login/").send(constants.user_data)
        .expect(200)
        .then((response) => {
            auth_token = response.body.data.accessToken;
            expect(response.body.status).toEqual('success');
            expect(response.body.message).toEqual('Logged-In Successfully!');
            expect(response.body.data).toEqual(
              expect.objectContaining({
                accessToken: expect.any(String),
              }),
            );
        });
    })
    it("GET /api/activityfeed/:id (with correct id value)", async () => {
        const id = constants.activity_feed_id;
        const headers = {
            "x-access-token": auth_token
        }
        await supertest(app).get(`/api/activityfeed/${id}/`).set(headers)
        .expect(200)
        .then((response) => {
            expect(response.body.status).toEqual('success');
            expect(response.body.message).toEqual('Successfully Fetch Activity Feed');
        })
    })
    it("GET /api/activityfeed/:id (with correct id value)", async () => {
        const id = constants.activity_feed_id;
        const headers = {
            "x-access-token": auth_token
        }
        ActivityFeed.findOne = jest.fn().mockImplementation(() => {
          throw new Error();
        });
        await supertest(app).get(`/api/activityfeed/${id}/`).set(headers)
        .expect(400)
        .then((response) => {
            expect(response.body.status).toEqual('failure');
            expect(response.body.message).toEqual('Failed to Get Activity Feed.');
        })
    })
    it("GET /api/activityfeed/:id (with wrong id value)", async () => {
        const wrong_id = constants.activity_feed_id;
        const headers = {
            "x-access-token": auth_token
        }
        await supertest(app).get(`/api/activityfeed/${wrong_id}0000/`).set(headers)
        .expect(400)
        .then((response) => {
            expect(response.body.status).toEqual('failure');
            expect(response.body.message).toEqual('Failed to Get Activity Feed.');
        })
    })
})