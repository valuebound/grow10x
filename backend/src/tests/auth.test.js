const supertest = require("supertest");
const { createServer } = require("../utility/server");
const app = createServer();
const constants = require("./constants");
const Organization = require("../modules/organization/model");
const User = require("../modules/user/model");
const { setupDB } = require("./testSetup");

jest.mock("google-auth-library")
const { OAuth2Client } = require("google-auth-library");
OAuth2Client.mockImplementation(() => {
    return {verifyIdToken: verifyIdTokenMock}
})

setupDB()
jest.mock('@sendgrid/mail');


describe("login-check", () => {
    var auth_token;
    const payload_without_idToken = constants.org_admin_data
    const payload_with_idToken = {
        idToken: constants.idToken,
        email: constants.org_admin_data.email,
        password: constants.org_admin_data.password
    }
    res = {}
    it("POST /api/auth/login", async () => {
        await supertest(app).post("/api/auth/login/").send(payload_with_idToken)
        .expect(422)
        .then((response) => {
            expect(response.body.status).toEqual("failure");
        });
    })
    it("POST /api/auth/login", async () => {
        await supertest(app).post("/api/auth/login/").send(payload_without_idToken)
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
    it("GET /api/auth/logout with headers", async () => {
        payload_with_idToken["idToken"] = auth_token;
        const headers = {
            "x-access-token": auth_token
        }
        await supertest(app).get("/api/auth/logout/").set(headers).send(payload_with_idToken)
        .expect(200)
        .then((response) => {
            expect(response.body.status).toEqual("success");
            expect(response.body.message).toEqual("Logged-Out Successfully!");
        });
    })
    it("GET /api/auth/logout without headers", async () => {
        payload_with_idToken["idToken"] = auth_token;
        await supertest(app).get("/api/auth/logout/").send(payload_with_idToken)
        .expect(401)
        .then((response) => {
            expect(response.body.status).toEqual("failure");
            expect(response.body.message).toEqual("User Not Found! Invalid Token");
        });
    })
    it("GET /api/auth/refresh-token with headers", async () => {
        const headers = {
            "x-access-token": auth_token,
            "refresh": auth_token
        }
        await supertest(app).get("/api/auth/refresh-token/").set(headers)
        .expect(200)
        .then((response) => {
            expect(response.body.status).toEqual("success");
            expect(response.body.message).toEqual("Access Token and its details");
        });
    })
    it("GET /api/auth/refresh-token without headers", async () => {
        await supertest(app).get("/api/auth/refresh-token/")
        .expect(403)
        .then((response) => {
            expect(response.body.status).toEqual("failure");
            expect(response.body.message).toEqual("No refresh token provided");
        });
    })
    it("GET /api/auth/orglist with super-admin", async () => {
        await supertest(app).post("/api/auth/login/").send(
            {
            "email":constants.super_admin_data.email,
            "password": constants.super_admin_data.password
            }
        )
        .expect(200)
        .then((response) => {
            auth_token = response.body.data.accessToken;
        })
        const headers = {
            "x-access-token": auth_token,
        }
        await supertest(app).get("/api/auth/orglist").set(headers)
        .expect(200)
        .then((response) => {
            expect(response.body.status).toEqual("success");
            expect(response.body.message).toEqual("Registered Organization's list");
        });
    })
    it("GET /api/auth/orglist with org-admin details", async () => {
        await supertest(app).post("/api/auth/login/").send(
            {
            "email": constants.org_admin_data.email,
            "password": constants.org_admin_data.password
            }
        )
        .expect(200)
        .then((response) => {
            auth_token = response.body.data.accessToken;
        })
        const headers = {
            "x-access-token": auth_token,
        }
        await supertest(app).get("/api/auth/orglist").set(headers)
        .expect(403)
        .then((response) => {
            expect(response.body.status).toEqual("failure");
            expect(response.body.message).toEqual("Require Super Admin Role!");
        });
    })
    it("GET /api/auth/user-details with token", async () => {
        const headers = {
            "x-access-token": auth_token
        }
        await supertest(app).get("/api/auth/user-details").set(headers)
        .expect(200)
        .then((response) => {
           expect(response.body.status).toEqual("success");
           expect(response.body.message).toEqual("Data fetched Successfully");
       });
   })
   it("GET /api/auth/user-details without token", async () => {
        await supertest(app).get("/api/auth/user-details")
        .expect(403)
        .then((response) => {
           expect(response.body.status).toEqual("failure");
           expect(response.body.message).toEqual("No Token Provided!");
       });
   })
   it("POST /api/auth/orgsignup with super-admin", async () => {
        await supertest(app).post("/api/auth/login/").send(
            {
            "email":constants.super_admin_data.email,
            "password": constants.super_admin_data.password
            }
        )
        .expect(200)
        .then((response) => {
            auth_token = response.body.data.accessToken;
        })
        const headers = {
            "x-access-token": auth_token,
        }
        new_org = constants.new_org_signup
        const org_deleted = await Organization.deleteOne({adminEmail: new_org.adminEmail})
        const user_deleted = await User.deleteOne({email: new_org.adminEmail})
        await supertest(app).post("/api/auth/orgsignup").set(headers).send(new_org)
        .expect(201)
        .then((response) => {
            expect(response.body.status).toEqual("success");
            expect(response.body.data.orgName).toEqual(new_org.orgName);
            expect(response.body.data.orgUsername).toEqual(new_org.orgUsername);
            expect(response.body.data.adminName).toEqual(new_org.adminName);
            expect(response.body.data.adminEmail).toEqual(new_org.adminEmail);
        });
   })
   it("DELETE /api/auth/delete/:orgid with org-admin details", async () => {
        await supertest(app).post("/api/auth/login/").send(
            {
            "email": constants.super_admin_data.email,
            "password": constants.super_admin_data.password
            }
        )
        .expect(200)
        .then((response) => {
            auth_token = response.body.data.accessToken;
        })
        const headers = {
            "x-access-token": auth_token,
        }
        const org_data = await Organization.findOne({adminEmail: new_org.adminEmail},{_id:1})
        if (org_data.length > 0) {
            org_id = org_data[0]["_id"];
            await supertest(app).delete(`/api/auth/delete/${org_id}`).set(headers)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toEqual("success");
                expect(response.body.data._id).toEqual(org_id);
            });
        }
        new_org = constants.new_org_signup
        const org_deleted = await Organization.deleteOne({adminEmail: new_org.adminEmail})
        const user_deleted = await User.deleteOne({email: new_org.adminEmail})
    })
})