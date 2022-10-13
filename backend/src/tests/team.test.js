const supertest = require("supertest");
const { createServer } = require('../utility/server');
const app = createServer();
const constants = require('./constants');
const { setupDB } = require("./testSetup");
const Team = require("../modules/team/model");
const { user, userType } = require("../models");
const TimePeriod = require("../modules/timeperiod/model");

setupDB()

describe("organization", () => {
    var admin_auth_token;
    var create_team_id;;
    var check_available="okr-portal";
    var already_available="digital";
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

    it("get team name available", async() =>{
        const headers = {
            "x-access-token":admin_auth_token
        }
        await supertest(app).get(`/api/team/verify?teamName=${check_available}`).set(headers)
            .expect(200)
            .then((response)=>{
                expect(response.body.status).toEqual('success')
                expect(response.body.message).toEqual(`Team Name - ${check_available} is available.`)
            })
    })

    it("get team name not available", async() =>{
        const headers = {
            "x-access-token":admin_auth_token
        }
        await supertest(app).get(`/api/team/verify?teamName=${already_available}`).set(headers)
            .expect(400)
            .then((response)=>{
                expect(response.body.status).toEqual('failure')
                expect(response.body.message).toEqual(`Team Name - ${already_available} is not available.`)
            })
    })
    
    it("create team name", async() =>{
        const headers = {
            "x-access-token":admin_auth_token
        }
        const payload = {
            teamName:"Digitall",
        }
        await supertest(app).post(`/api/team/`).set(headers).send(payload)
            .expect(201)
            .then((response)=>{
                create_team_id = response.body.data._id
                expect(response.body.status).toEqual('success')
                expect(response.body.message).toEqual("Team created successfully!")
                expect(response.body.data)
            })
    })

    it("update team name", async() =>{
        const headers = {
            "x-access-token":admin_auth_token
        }
        const payload = {
            teamName:"new",
            users:["633bcae252a8ef414c59db2f"]
        }
        await supertest(app).put(`/api/team/update/${create_team_id}`).set(headers).send(payload)
            .expect(200)
            .then((response)=>{
                expect(response.body.status).toEqual('success')
                expect(response.body.message).toEqual(`Team :- ${payload.teamName} is Updated.`)
                expect(response.body.data)
            })
    })

    it("delete Team",async()=>{
        const headers = {
            "x-access-token":admin_auth_token
        }
        await supertest(app).delete(`/api/team/delete/${create_team_id}`).set(headers)
            .expect(200)
            .then((response)=>{
                expect(response.body.status).toEqual('success')
                expect(response.body.message).toEqual(`${response.body.data.teamName} is deleted.`)
                expect(response.body.data)
            }) 
    })

    it("get team list",async()=>{
        const headers = {
            "x-access-token":admin_auth_token
        }
        await supertest(app).get(`/api/team/teams`).set(headers)
            .expect(200)
            .then((response)=>{
                expect(response.body.status).toEqual('success')
                expect(response.body.message).toEqual(`${response.body.data.length} Team's Fetched Successfully!!`)
                expect(response.body.data)
            }) 
    })

    it("get teams", async()=>{
        const headers = {
            "x-access-token":admin_auth_token
        }
        await supertest(app).get("/api/team/").set(headers)
            .expect(200)
            .then((response)=>{
                expect(response.body.status).toEqual('success')
                expect(response.body.message).toEqual(`${response.body.data.length} Team's details Fetched Successfully`)
                expect(response.body.data)
            })
    })

    it("get all members", async() => {
        const headers={
            "x-access-token":admin_auth_token
        }
        await supertest(app).get("/api/team/members?status=true").set(headers)
            .expect(200)
            .then((response)=>{
                expect(response.body.status).toEqual('success')
                expect(response.body.message).toEqual('All members details & their teams')
            })
    })

    it("get team name available error", async() =>{
        const headers = {
            "x-access-token":admin_auth_token
        }
        Team.findOne = jest.fn().mockImplementation(()=>{
            throw new Error()
        })
        await supertest(app).get(`/api/team/verify?teamName= `).set(headers)
            .expect(500)
            .then((response)=>{
                expect(response.body.status).toEqual('failure')
                expect(response.body.message).toEqual("SOMETHING WENT WRONG")
            })
    })

    it("create team name error", async() =>{
        const headers = {
            "x-access-token":admin_auth_token
        }
        user.findByIdAndUpdate = jest.fn().mockImplementation(()=>{
            throw new Error()
        })
        await supertest(app).post(`/api/team/`).set(headers)
            .expect(400)
            .then((response)=>{
                expect(response.body.status).toEqual('failure')
            })
    })

    it("update team name error", async() =>{
        const headers = {
            "x-access-token":admin_auth_token
        }
        Team.findByIdAndUpdate = jest.fn().mockImplementation(()=>{
            throw new Error()
        })
        await supertest(app).put(`/api/team/update/${create_team_id}`).set(headers)
            .expect(500)
            .then((response)=>{
                expect(response.body.status).toEqual('failure')
                expect(response.body.message).toEqual('SOMETHING WENT WRONG')
            })
    })

    it("delete Team Name error",async()=>{
        const headers = {
            "x-access-token":admin_auth_token
        }
        Team.findByIdAndDelete = jest.fn().mockImplementation(()=>{
            throw new Error()
        })
        await supertest(app).delete(`/api/team/delete/${create_team_id}`).set(headers)
            .expect(500)
            .then((response)=>{
                expect(response.body.status).toEqual('failure')
                expect(response.body.message).toEqual('SOMETHING WENT WRONG')
            }) 
    })

    it("get team list error", async() =>{
        const headers = {
            "x-access-token":admin_auth_token
        }
        Team.find = jest.fn().mockImplementation(()=>{
            throw new Error()
        })
        await supertest(app).get(`/api/team/teams`).set(headers)
            .expect(500)
            .then((response)=>{
                expect(response.body.status).toEqual('failure')
                expect(response.body.message).toEqual('SOMETHING WENT WRONG')
            })
    })

    it("get teams error", async()=>{
        const headers = {
            "x-access-token":admin_auth_token
        }
        userType.findById = jest.fn().mockImplementation(()=>{
            throw new Error()
        })
        await supertest(app).get("/api/team/").set(headers)
            .expect(500)
            .then((response)=>{
                expect(response.body.status).toEqual('failure')
                expect(response.body.message).toEqual('SOMETHING WENT WRONG')
            })
    })

    it("get all members error", async() => {
        const headers={
            "x-access-token":admin_auth_token
        }
        TimePeriod.findOne = jest.fn().mockImplementation(()=>{
            throw new Error()
        })
        await supertest(app).get("/api/team/members?status=true").set(headers)
            .expect(500)
            .then((response)=>{
                expect(response.body.status).toEqual('failure')
                expect(response.body.message).toEqual('SOMETHING WENT WRONG')
            })
    })
    
})