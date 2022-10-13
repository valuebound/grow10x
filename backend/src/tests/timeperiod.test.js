const supertest = require("supertest");
const { createServer } = require('../utility/server');
const app = createServer();
const constants = require("./constants");
const TimePeriod = require("../modules/timeperiod/model");
const { setupDB } = require("./testSetup");

setupDB()

describe("timeperiod", () => {
    var timeperiod_created_id;
    var auth_token;
    it("timeperiod login to get auth", async () => {
        await supertest(app).post("/api/auth/login/").send(constants.org_admin_data)
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

    it("get alltimeperiods", async()=>{
        const headers = {
            "x-access-token": auth_token
        }
        await supertest(app).get("/api/timeperiod/").set(headers)
            .expect(200)
            .then((response)=>{
                expect(response.body.status).toEqual('success')
                if(response.body.data.length==0){
                    expect(response.body.message).toEqual('No time period is found, please contact your org Admin.')
                }
                else{
                    expect(response.body.message).toEqual('Time Period List is Fetched Successfully.')
                    expect(response.body.data.length).toBeGreaterThan(0);
                }  
            })
    })

    it("post timeperiod create", async() => {
        const headers = {
            "x-access-token": auth_token
        }
        const payload={
            "name":"Q2",
            "startDate":"2022-04-01",
            "endDate":"2022-06-30",
            "isCurrent":true
        }
        await supertest(app).post("/api/timeperiod/create").set(headers).send(payload)
            .expect(201)
            .then((response)=>{
                timeperiod_created_id = response.body.data._id
                expect(response.body.message).toEqual(`${response.body.data.name} created successfully`)
                expect(response.body.status).toEqual('success')
                expect(response.body.data)
            })
    })

    it("post timeperiod create fails if already exists or missing dates", async() => {
        const headers = {
            "x-access-token": auth_token
        }
        const payload={
            "name":"Q3",
            "endDate":"2022-09-30"
        }
        await supertest(app).post("/api/timeperiod/create").set(headers).send(payload)
            .expect(400)
            .then((response)=>{
                expect(response.body.status).toEqual('failure')
                if(payload.startDate==undefined || payload.endDate==undefined){
                    expect(response.body.message).toEqual('Failed! Start or End Date is Empty!')
                }
                else{
                    expect(response.body.message).toEqual('Time Period Already Exist!')
                }
            })
    })

    it("update time period", async() => {
        const headers={
            "x-access-token":auth_token
        }
        const payload = {
            startDate:"2022-07-02",
        }
        await supertest(app).patch(`/api/timeperiod/update/${timeperiod_created_id}`).set(headers).send(payload)
            .expect(200)
            .then((response) => {
                expect(response.body.data)
            })  
    })

    it("update time period", async() => {
        const headers={
            "x-access-token":auth_token
        }
        const payload = {
            startDate:"2022-07-02",
        }
        TimePeriod.findById = jest.fn().mockImplementation(()=>{
            return {isDeleted:true}
        })
        await supertest(app).patch(`/api/timeperiod/update/${timeperiod_created_id}`).set(headers).send(payload)
            .expect(400)
            .then((response) => {
                expect(response.body.data)
            })  
    })

    it("update time period error", async() => {
        const headers={
            "x-access-token":auth_token
        }
        const payload = {
            startDate:"2022-07-02"
        }
        TimePeriod.findById = jest.fn().mockImplementation(() => {
            throw new Error();
          });
        await supertest(app).patch(`/api/timeperiod/update/${timeperiod_created_id}`).set(headers).send(payload)
            .expect(400)
            .then((response) => {
                expect(response.body.message).toEqual("Failed to Update Time Period")
            })  
    })

    it("delete Time Period", async() => {
        const headers={
            "x-access-token":auth_token 
        }
        TimePeriod.findById = jest.fn().mockImplementation(() => {
            return {isDeleted:false}
          });
        await supertest(app).delete(`/api/timeperiod/delete/${timeperiod_created_id}`).set(headers)
            .expect(200)
            .then((response)=>{
                expect(response.body.status).toEqual('success')
            })
    })

    it("delete Time Period error", async() => {
        const headers={
            "x-access-token":auth_token 
        }
        TimePeriod.findById = jest.fn().mockImplementation(() => {
            throw new Error();
          });
        await supertest(app).delete(`/api/timeperiod/delete/${timeperiod_created_id}`).set(headers)
            .expect(400)
            .then((response)=>{
                expect(response.body.status).toEqual('failure')
                expect(response.body.message).toEqual("Failed to Delete Time Period")
            })
        await TimePeriod.deleteOne({_id:timeperiod_created_id})
    })

    it("delete Time Period error if already deleted", async() => {
        const headers={
            "x-access-token":auth_token 
        }
        TimePeriod.findById = jest.fn().mockImplementation(()=>{
            return {isDeleted:true}
        })
        await supertest(app).delete(`/api/timeperiod/delete/${timeperiod_created_id}`).set(headers)
            .expect(400)
            .then((response)=>{
                expect(response.body.status).toEqual('failure')
                expect(response.body.data)
            })
    })

    // it("get alltimeperiods other success", async()=>{
    //     const headers = {
    //         "x-access-token": auth_token
    //     }
    //     TimePeriod.find = jest.fn().mockImplementation(()=>{
    //         return []
    //     })
    //     await supertest(app).get("/api/timeperiod/").set(headers)
    //         .expect(400)
    //         .then((response)=>{
    //             console.log(response.body)
    //             expect(response.body.status).toEqual('success')
    //             expect(response.body.message).toEqual('No time period is found, please contact your org Admin.')
    //         })
    // })

    it("get alltimeperiods error", async()=>{
        const headers = {
            "x-access-token": auth_token
        }
        TimePeriod.find = jest.fn().mockImplementation(() => {
            throw new Error();
          });
        await supertest(app).get("/api/timeperiod/").set(headers)
            .expect(400)
            .then((response)=>{
                expect(response.body.message).toEqual('Failed to Fetch all Time Period')
                
            })
    })
})