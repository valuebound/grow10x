const supertest = require("supertest");
const { createServer } = require('../utility/server');
const app = createServer();
const constants = require('./constants');
const organizationModel = require("../modules/organization/model")
const { userType } = require("../models");
const { setupDB } = require("./testSetup");

setupDB()

describe("organization", () => {
    var admin_auth_token;
    var super_admin_auth_token;
    it("organization login to get admin auth", async () => {
        await supertest(app).post("/api/auth/login/").send(constants.org_admin_data)
        .expect(200)
        .then((response) => {
            admin_auth_token = response.body.data.accessToken;
            expect(response.body.status).toEqual('success');
            expect(response.body.message).toEqual('Logged-In Successfully!');
            expect(response.body.data).toEqual(
              expect.objectContaining({
                accessToken: expect.any(String),
              }),
            );
        });
    })

    it("organization login to get super admin auth", async () => {
        await supertest(app).post("/api/auth/login/").send(constants.super_admin_data)
        .expect(200)
        .then((response) => {
            super_admin_auth_token = response.body.data.accessToken;
            expect(response.body.status).toEqual('success');
            expect(response.body.message).toEqual('Logged-In Successfully!');
            expect(response.body.data).toEqual(
              expect.objectContaining({
                accessToken: expect.any(String),
              }),
            );
        });
    })


    it("get all users under organizations", async() => {
        const headers = {
            "x-access-token": admin_auth_token
        }
        await supertest(app).get("/api/myorganization/employees").set(headers)
            .expect(200)
            .then((response) => {
                expect(response.body.message).toEqual(response.body.data.length+" User's of My Org Fetched successfully!!")
                expect(response.body.data)
            })
    })

    it("update Org", async() => {
        const headers = {
            "x-access-token": admin_auth_token
        }
        const payload = {
            location: "Hyderabad"
        }
        await supertest(app).patch(`/api/myorganization/${constants.org_id}/update`).set(headers).send(payload)
            .expect(200)
            .then((response) => {
                expect(response.body.message).toEqual("My Organization Updated Successfully")
                expect(response.body.data)
            })
    })

    it("get organization profile", async() => {
        const headers = {
            "x-access-token": admin_auth_token
        }
        await supertest(app).get("/api/myorganization/profile").set(headers)
            .expect(200)
            .then((response) => {
                expect(response.body.message).toEqual("Successfully Fetch My Org Profile")
                expect(response.body.data)
            })
    })

    it("update Org by SU", async() => {
        const headers = {
            "x-access-token": super_admin_auth_token
        }
        const payload = {
            location:"Hyderabad"
        }
        await supertest(app).get(`/api/myorganization/${constants.org_id}/update/su`).set(headers).send(payload)
            .expect(403)
            .then((response) => {
                expect(response.body.message).toEqual("Organization Is not Same.!!")
            })
    })

    it("get org chart", async() => {
        const headers = {
            "x-access-token": admin_auth_token
        }
        await supertest(app).get("/api/myorganization/org-chart").set(headers)
            .expect(200)
            .then((response) => {
                expect(response.body.message).toEqual("Successfully Fetch the Org Chart")
                expect(response.body.data).toEqual(
                    expect.objectContaining({
                        id:expect.any(String),
                        value:expect.objectContaining({
                            name:expect.any(String),
                            items:expect.objectContaining({
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
                            })
                        }),
                        children:expect.arrayContaining([
                            expect.objectContaining({
                                id:expect.any(String),
                            })
                        ])
                    })
                )
            })
    })

    it("get company details", async() => {
        const headers = {
            "x-access-token": admin_auth_token
        }
        await supertest(app).get("/api/myorganization/company/details").set(headers)
            .expect(200)
            .then((response) => {
                expect(response.body.message).toEqual("Successfully Fetch the Organization Details")
                expect(response.body.data)
            })
    })

    it("update company details", async() => {
        const headers = {
            "x-access-token": admin_auth_token
        }
        const payload = {
            vision: "Great visions"
        }
        await supertest(app).patch("/api/myorganization/company/updatedetails").set(headers).send(payload)
            .expect(200)
            .then((response) => {
                expect(response.body.message).toEqual("Successfully Update the Organization Details")
                expect(response.body.data)
            })
    }) 


    it("get all users under organizations if error", async() => {
        const headers = {
            "x-access-token": admin_auth_token
        }
        organizationModel.findById = jest.fn().mockImplementation(() => {
            throw new Error();
        });
        await supertest(app).get("/api/myorganization/employees").set(headers)
            .expect(400)
            .then((response) => {
                expect(response.body.message).toEqual("Falied to get my organization User's account list")
            })
    })

    it("get all users under organizations if error", async() => {
        const headers = {
            "x-access-token": admin_auth_token
        }
        organizationModel.findById = jest.fn().mockImplementation(() => {
            return null
        });
        await supertest(app).get("/api/myorganization/employees").set(headers)
            .expect(400)
            .then((response) => {
                expect(response.body.message).toEqual("Invalid Data Requested. Org Not Found!!")
            })
    })

    it("update Org if error", async() => {
        const headers = {
            "x-access-token": admin_auth_token
        }
        const payload = {
            location: "Hyderabad"
        }
        organizationModel.findByIdAndUpdate = jest.fn().mockImplementation(() => {
            throw new Error();
        });
        await supertest(app).patch(`/api/myorganization/${constants.org_id}/update`).set(headers).send(payload)
            .expect(403)
            .then((response) => {
                expect(response.body.message).toEqual("Invalid Organization.!!")
            })
    })

    it("get organization profile if error", async() => {
        const headers = {
            "x-access-token": admin_auth_token
        }
        organizationModel.findById = jest.fn().mockImplementation(() => {
            throw new Error();
        });
        await supertest(app).get("/api/myorganization/profile").set(headers)
            .expect(400)
            .then((response) => {
                expect(response.body.message).toEqual("Falied to Fetch My Org Profile")
            })
    })

    it("get org chart if error", async() => {
        const headers = {
            "x-access-token": admin_auth_token
        }
        userType.findOne = jest.fn().mockImplementation(() => {
            throw new Error();
        });
        await supertest(app).get("/api/myorganization/org-chart").set(headers)
            .expect(400)
            .then((response) => {
                expect(response.body.message).toEqual("Failed to Fetch the Organization Chart")
            })
    }) 
    
    it("get company details error", async() => {
        const headers = {
            "x-access-token": admin_auth_token
        }
        organizationModel.findById = jest.fn().mockImplementation(() => {
            throw new Error()
        });
        await supertest(app).get("/api/myorganization/company/details").set(headers)
            .expect(400)
            .then((response) => {
                expect(response.body.message).toEqual("Failed to Fetch the Organization Details")
            })
    })

    it("update company details error", async() => {
        const headers = {
            "x-access-token": admin_auth_token
        }
        const payload = {
            vision: "Great visions"
        }
        organizationModel.findByIdAndUpdate = jest.fn().mockImplementation(() => {
            throw new Error()
        });
        await supertest(app).patch("/api/myorganization/company/updatedetails").set(headers).send(payload)
            .expect(400)
            .then((response) => {
                expect(response.body.message).toEqual("Failed to Update the Organization Details")
            })
    }) 

})