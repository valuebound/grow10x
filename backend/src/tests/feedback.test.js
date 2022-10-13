const supertest = require("supertest");
const { createServer } = require("../utility/server");
const app = createServer();
const mongoose = require("mongoose");
const constants = require("./constants");
const feedback = require("../modules/feedback/model");
const { setupDB } = require("./testSetup");

setupDB();

describe("feedback test", () => {
  var auth_token;
  res = {};
  it("POST /api/auth/login", async () => {
    await supertest(app)
      .post("/api/auth/login/")
      .send(constants.user_data)
      .expect(200)
      .then((response) => {
        auth_token = response.body.data.accessToken;
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual("Logged-In Successfully!");
        expect(response.body.data).toEqual(
          expect.objectContaining({
            accessToken: expect.any(String),
          })
        );
      });
  });
  it("GET api/feedback/:orgid/feeds", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(`/api/feedback/${constants.org_id}/feeds`)
      .set(headers)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual("Feedbacks Fetched Successfully");
      });
  });
  it("GET api/feedback/:orgid/feeds with 500 error", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    feedback.find = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    await supertest(app)
      .get(`/api/feedback/${constants.org_id}/feeds`)
      .set(headers)
      .expect(500)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("Error Occurred");
      });
  });
  it("GET api/feedback/:orgid/feeds with wrong org id", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(`/api/feedback/${constants.org_id}0000/feeds`)
      .set(headers)
      .expect(403);
  });
  it("POST api/feedback/:orgid/:userid/", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .post(`/api/feedback/${constants.org_id}/${constants.user_id}`)
      .set(headers)
      .expect(201)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual("Feedback created");
        expect(response.body.data.user).toEqual(constants.user_id);
      });
  });
  it("PUT api/feedback/:orgid/:feedbackid/ by user", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .put(`/api/feedback/${constants.org_id}/${constants.feedback_id}`)
      .set(headers)
      .send(constants.update_feedback)
      .expect(201)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual("Feedback received");
        expect(response.body.data._id).toEqual(constants.feedback_id);
      });
  });
  it("PUT api/feedback/:orgid/:feedbackid/ by manager", async () => {
    let manager_token;
    await supertest(app)
      .post("/api/auth/login/")
      .send(constants.manager_data)
      .expect(200)
      .then((response) => {
        manager_token = response.body.data.accessToken;
      });
    const headers = {
      "x-access-token": manager_token,
    };
    await supertest(app)
      .put(`/api/feedback/${constants.org_id}/${constants.feedback_id}`)
      .set(headers)
      .send(constants.update_manager_feedback)
      .expect(201)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual("Feedback received");
        expect(response.body.data._id).toEqual(constants.feedback_id);
      });
  });
  it("PUT api/feedback/:orgid/:feedbackid/ by admin", async () => {
    let admin_token;
    await supertest(app)
      .post("/api/auth/login/")
      .send(constants.org_admin_data)
      .expect(200)
      .then((response) => {
        admin_token = response.body.data.accessToken;
      });
    const headers = {
      "x-access-token": admin_token,
    };
    await supertest(app)
      .put(`/api/feedback/${constants.org_id}/${constants.feedback_id}`)
      .set(headers)
      .send(constants.update_admin_feedback)
      .expect(201)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual("Feedback received");
        expect(response.body.data._id).toEqual(constants.feedback_id);
      });
  });
  it("PUT api/feedback/:orgid/:feedbackid/ by admin", async () => {
    let admin_token;
    await supertest(app)
      .post("/api/auth/login/")
      .send(constants.org_admin_data)
      .expect(200)
      .then((response) => {
        admin_token = response.body.data.accessToken;
      });
    const headers = {
      "x-access-token": admin_token,
    };
    feedback.findByIdAndUpdate = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    await supertest(app)
      .put(`/api/feedback/${constants.org_id}/${constants.feedback_id}`)
      .set(headers)
      .send(constants.update_admin_feedback)
      .expect(500)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
      });
  });
  it("PUT api/feedback/:orgid/:feedbackid/ by user", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    feedback.findByIdAndUpdate = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    await supertest(app)
      .put(`/api/feedback/${constants.org_id}/${constants.feedback_id}`)
      .set(headers)
      .send(constants.update_feedback)
      .expect(500)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
      });
  });
});
