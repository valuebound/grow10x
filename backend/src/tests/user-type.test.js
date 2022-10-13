const supertest = require("supertest");
const { createServer } = require("../utility/server");
const app = createServer();
const mongoose = require("mongoose");
const constants = require("./constants");
const typeModel = require("../modules/userType/model");
const { setupDB } = require("./testSetup");

setupDB();

const CREATE_USER_TYPE = {
  role: "TEST",
  permission: ["view_organizational_structure"],
};

describe("user-type test", () => {
  let auth_token;
  let _id = "";
  res = {};

  it("POST /api/auth/login - with-user", async () => {
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

  it("GET api/user-types/roles", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(`/api/user-types/roles`)
      .set(headers)
      .expect(403)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("Require Admin ROle");
      });
  });

  it("POST /api/auth/login - with-admin", async () => {
    await supertest(app)
      .post("/api/auth/login/")
      .send(constants.org_admin_data)
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

  it("GET api/user-types/roles", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(`/api/user-types/roles`)
      .set(headers)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual("All roles details");
      });
  });

  it("POST api/user-types", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .post(`/api/user-types`)
      .send(CREATE_USER_TYPE)
      .set(headers)
      .expect(201)
      .then((response) => {
        _id = response.body.data._id;
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual("TEST role added successfully");
        expect(response.body.data.role).toEqual(CREATE_USER_TYPE.role);
      });
  });

  it("DELETE delete-created-type", async () => {
    await typeModel.findOneAndDelete({ _id });
  });
});
