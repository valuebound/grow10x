const supertest = require("supertest");
const { createServer } = require("../utility/server");
const app = createServer();
const mongoose = require("mongoose");
const constants = require("./constants");
const Okr = require("../modules/okr/model");
const { setupDB } = require("./testSetup");
const Checkin = require("../models/checkin.model");
const TimePeriod = require("../modules/timeperiod/model");
const ActivityFeed = require("../modules/activityFeed/model");
const User = require("../modules/user/model");

jest.mock("@sendgrid/mail");

setupDB();

describe("user-type test", () => {
  let auth_token;
  res = {};

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

  it("GET /api/okr?owner=userId&quarter=&type=individual (with empty quater value)", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(`/api/okr?owner=${constants.admin_id}&quarter=&type=individual`)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("Quarter Doesn't Exist");
      });
  });

  it("GET /api/okr?owner=&quarter=quaterId&type=individual (with empty userId value)", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(`/api/okr?owner=&quarter=${constants.quarter_id}&type=individual`)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("Owner Doesn't Exist");
      });
  });

  it("GET /api/okr?owner=userId&quarter=quaterId&type= (with empty type value)", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(
        `/api/okr?owner=${constants.admin_id}&quarter=${constants.quarter_id}&type=`
      )
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("Type Doesn't Exist");
      });
  });

  it("GET /api/okr?owner=userId&quarter=quaterId&type=individual (with type individual)", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(
        `/api/okr?owner=${constants.admin_id}&quarter=${constants.quarter_id}&type=individual`
      )
      .set(headers)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual("OKRs details");
      });
  });

  it("GET /api/okr?owner=userId&quarter=quaterId&type=company (with type company)", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(
        `/api/okr?owner=${constants.admin_id}&quarter=${constants.quarter_id}&type=company`
      )
      .set(headers)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual("OKRs details");
      });
  });

  it("GET /api/okr?owner=userId&quarter=quaterId&type=invalid (with invalid type)", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(
        `/api/okr?owner=${constants.admin_id}&quarter=${constants.quarter_id}&type=invalid`
      )
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("Invalid Type Provided");
      });
  });

  it("GET /api/okr?owner=userId&quarter=quaterId&type=individual (with invalid quaterId)", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(
        `/api/okr?owner=${constants.admin_id}&quarter=${constants.quarter_id}1&type=individual`
      )
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("Invalid quarter id provided");
      });
  });

  it("GET /api/okr/:orkId (with orkId)", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(`/api/okr/${constants.admin_okr_id}`)
      .set(headers)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual(
          "Objective is successfully fetched"
        );
      });
  });

  it("GET /api/okr/:orkId (with invalid orkId)", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(`/api/okr/${constants.admin_okr_id}1`)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("Invalid okr id Provided");
      });
  });

  it("GET /api/okr/checkin/summary?quarter= (with empty quarter)", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(`/api/okr/checkin/summary?quarter=`)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("Time Period Doesn't Exist");
      });
  });

  it("GET /api/okr/checkin/summary?quarter=quarterId (with quarterId)", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(`/api/okr/checkin/summary?quarter=${constants.quarter_id}`)
      .set(headers)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual(
          "Successfully Fetched Checkin Summary"
        );
      });
  });

  it("GET /api/okr/checkin/company/summary?quarter= (with empty quarter)", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(`/api/okr/checkin/company/summary?quarter=`)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("Time Period Doesn't Exist");
      });
  });

  it("GET /api/okr/checkin/company/summary?quarter=quarterId (with quarterId)", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(`/api/okr/checkin/company/summary?quarter=${constants.quarter_id}`)
      .set(headers)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual(
          "Successfully Fetched Checkin Summary"
        );
      });
  });

  let timePeriodId;
  let createTimePeriod = {
    name: "Q3",
    startDate: "1990-07-01",
    endDate: "1990-09-31",
    isCurrent: true,
  };

  it("POST /api/timeperiod/create (Create time Period for testing) ", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .post(`/api/timeperiod/create`)
      .send(createTimePeriod)
      .set(headers)
      .expect(201)
      .then((response) => {
        timePeriodId = response.body.data._id;
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual(
          `${createTimePeriod.name} (${createTimePeriod.startDate} - ${createTimePeriod.endDate}) created successfully`
        );
      });
  });

  it("Update isDelete true of time period", async () => {
    await TimePeriod.findByIdAndUpdate(timePeriodId, { isDeleted: true });
  });

  it("POST /api/okr (Create Okr without quarter) ", async () => {
    let createUser = {};
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .post(`/api/okr`)
      .send(createUser)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("Time Period Not Provided");
      });
  });

  it("POST /api/okr (Create Okr with deleted quarter) ", async () => {
    let createUser = {
      quarter: timePeriodId,
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .post(`/api/okr`)
      .send(createUser)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(
          `${createTimePeriod.name} (${createTimePeriod.startDate} - ${createTimePeriod.endDate}) is Deleted.`
        );
      });
  });

  it("Update isLocked true of time period", async () => {
    await TimePeriod.findByIdAndUpdate(timePeriodId, {
      isDeleted: false,
      isLocked: true,
    });
  });

  it("POST /api/okr (Create Okr with locked quarter) ", async () => {
    let createUser = {
      quarter: timePeriodId,
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .post(`/api/okr`)
      .send(createUser)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(
          `${createTimePeriod.name} (${createTimePeriod.startDate} - ${createTimePeriod.endDate}) is Locked.`
        );
      });
  });

  it("POST /api/okr (Create Okr with invalid quarter) ", async () => {
    let createUser = {
      quarter: "111111111111111111111111",
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .post(`/api/okr`)
      .send(createUser)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(
          `No time period is found, please contact your org Admin.`
        );
      });
  });

  it("Update isLocked false of time period", async () => {
    await TimePeriod.findByIdAndUpdate(timePeriodId, {
      isDeleted: false,
      isLocked: false,
    });
  });

  it("POST /api/okr (Create Okr with invalid type validaton) ", async () => {
    let createUser = {
      type: "invalid",
      quarter: timePeriodId,
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .post(`/api/okr`)
      .send(createUser)
      .set(headers)
      .expect(422)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(
          `Validation Failed! Invalid request data \"type\" must be one of [company, individual]`
        );
      });
  });

  it("POST /api/okr (Create Okr with start greater and target value) ", async () => {
    let createUser = {
      objective: "ADMIN OKR TEST!",
      type: "individual",
      krs: [
        {
          keyResult: "team test",
          target: 0,
          start: 200,
          currentValue: 40,
          isBoolean: false,
          unit: "%",
          comment: [],
        },
      ],
      quarter: timePeriodId,
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .post(`/api/okr`)
      .send(createUser)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(
          `start value '${createUser.krs[0].start}' should not be greater than target value '${createUser.krs[0].target}'`
        );
      });
  });

  it("POST /api/okr (Create Okr with start greater and target value) ", async () => {
    let createUser = {
      objective: "ADMIN OKR TEST!",
      type: "individual",
      krs: [
        {
          keyResult: "team test",
          target: 200,
          start: 200,
          currentValue: 40,
          isBoolean: false,
          unit: "%",
          comment: [],
        },
      ],
      quarter: timePeriodId,
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .post(`/api/okr`)
      .send(createUser)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(
          `start value '${createUser.krs[0].start}' should not be equal to target value '${createUser.krs[0].target}'`
        );
      });
  });

  it("POST /api/okr (Create Okr with invalid data) ", async () => {
    let createUser = {
      objective: "ADMIN OKR TEST!",
      type: "individual",
      krs: [
        {
          keyResult: "team test",
          currentValue: 40,
          isBoolean: false,
          unit: "%",
          comment: [],
        },
      ],
      quarter: timePeriodId,
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .post(`/api/okr`)
      .send(createUser)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(`Invalid Request Data'`);
      });
  });

  let okr_id, kr_id;
  it("POST /api/okr (Create Okr) ", async () => {
    let createOkr = {
      objective: "ADMIN OKR TEST!",
      type: "individual",
      krs: [
        {
          keyResult: "team test",
          target: 200,
          start: 100,
          currentValue: 40,
          isBoolean: false,
          unit: "%",
          comment: [],
        },
      ],
      quarter: timePeriodId,
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .post(`/api/okr`)
      .send(createOkr)
      .set(headers)
      .expect(201)
      .then((response) => {
        okr_id = response.body.data._id;
        kr_id = response.body.data.krs[0]._id;
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual(`OKR created successfully!`);
      });
  });

  it("Update isLocked true of time period", async () => {
    await TimePeriod.findByIdAndUpdate(timePeriodId, {
      isLocked: true,
    });
  });

  it("PUT /api/okr/:okrid (update with locked quarter) ", async () => {
    let updateOkr = {};
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .put(`/api/okr/${okr_id}`)
      .send(updateOkr)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(
          `Quarter Locked You Cannot Update it!`
        );
      });
  });

  it("Update isLocked false of time period", async () => {
    await TimePeriod.findByIdAndUpdate(timePeriodId, {
      isLocked: false,
    });
  });

  it("PUT /api/okr/:okrid (update Okr) ", async () => {
    let updateOkr = {
      objective: "update OKR TEST!",
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .put(`/api/okr/${okr_id}`)
      .send(updateOkr)
      .set(headers)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual(`OKR Updated Successfully!`);
      });
  });

  it("PUT /api/okr/:okrid (update Okr with invalid okrId) ", async () => {
    let updateOkr = {};
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .put(`/api/okr/${okr_id}1`)
      .send(updateOkr)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(`Invalid okr id Provided`);
      });
  });

  it("Update isLocked true of time period", async () => {
    await TimePeriod.findByIdAndUpdate(timePeriodId, {
      isLocked: true,
    });
  });

  it("PUT /api/okr/addkrs/:okrid (update add krs with locked quarter) ", async () => {
    let addKrs = {};
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .put(`/api/okr/${okr_id}`)
      .send(addKrs)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(
          `Quarter Locked You Cannot Update it!`
        );
      });
  });

  it("Update isLocked false of time period", async () => {
    await TimePeriod.findByIdAndUpdate(timePeriodId, {
      isLocked: false,
    });
  });

  it("PUT /api/okr/addkrs/:okrid (update add krs with start greater than target value) ", async () => {
    let addKrs = {
      krs: [
        {
          keyResult: "add  krs",
          target: 100,
          start: 110,
          currentValue: 40,
          isBoolean: false,
          unit: "%",
        },
      ],
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .put(`/api/okr/addkrs/${okr_id}`)
      .send(addKrs)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(
          `start value '${addKrs.krs[0].start}' should not be greater than target value '${addKrs.krs[0].target}'`
        );
      });
  });

  it("PUT /api/okr/addkrs/:okrid (update add krs with start greater than target value) ", async () => {
    let addKrs = {
      krs: [
        {
          keyResult: "add  krs",
          target: 100,
          start: 100,
          currentValue: 40,
          isBoolean: false,
          unit: "%",
        },
      ],
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .put(`/api/okr/addkrs/${okr_id}`)
      .send(addKrs)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(
          `start value '${addKrs.krs[0].start}' should not be equal to target value '${addKrs.krs[0].target}'`
        );
      });
  });

  it("PUT /api/okr/addkrs/:okrid (update add krs with invalid data value) ", async () => {
    let addKrs = {
      krs: [
        {
          keyResult: "add  krs",
          currentValue: 40,
          isBoolean: false,
          unit: "%",
        },
      ],
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .put(`/api/okr/addkrs/${okr_id}`)
      .send(addKrs)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(`Invalid Request Data'`);
      });
  });

  let new_krs_id;
  it("PUT /api/okr/addkrs/:okrid (update add krs) ", async () => {
    let addKrs = {
      krs: [
        {
          keyResult: "add  krs",
          target: 100,
          start: 90,
          currentValue: 40,
          isBoolean: false,
          unit: "%",
        },
      ],
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .put(`/api/okr/addkrs/${okr_id}`)
      .send(addKrs)
      .set(headers)
      .expect(200)
      .then((response) => {
        new_krs_id =
          response.body.data.krs[response.body.data.krs.length - 1]._id;
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual(`Added KRS Successfully!`);
      });
  });

  it("PUT /api/okr/addkrs/:okrid (update add krs) ", async () => {
    let addKrs = {};
    const headers = {
      "x-access-token": auth_token,
    };

    await supertest(app)
      .put(`/api/okr/${okr_id}1`)
      .send(addKrs)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(`Invalid okr id Provided`);
      });
  });

  it("PUT /api/okr/checkin/:krId (update checkIn and comment by krId) ", async () => {
    let krsBody = {
      comment: {
        text: "NEW FORMAT",
        commentedBy: constants.admin_id,
      },
      currentValue: 10,
    };

    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .put(`/api/okr/checkin/${kr_id}`)
      .send(krsBody)
      .set(headers)
      .expect(200)
      .then((response) => {
        console.log(kr_id);
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual(`Checkin Done`);
      });
  });

  it("PUT /api/okr/checkin/:krId (update checkIn and comment by invalid krId) ", async () => {
    let krsBody = {};
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .put(`/api/okr/checkin/${kr_id}1`)
      .send(krsBody)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(`Invalid okr id Provided`);
      });
  });

  let comment_id;
  it("PATCH /api/okr/addcomment/:krid (update add comment) ", async () => {
    let commentBody = {
      comment: {
        text: "comment by admin testng",
        commentedBy: constants.admin_id,
      },
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .patch(`/api/okr/addcomment/${kr_id}`)
      .send(commentBody)
      .set(headers)
      .expect(200)
      .then((response) => {
        comment_id =
          response.body.data.krs[0].comment[
            response.body.data.krs[0].comment.length - 1
          ]._id;
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual(`Comment Added`);
      });
  });

  it("PATCH /api/okr/updatecomment/:krid (update added comment) ", async () => {
    let updateComment = {
      text: "comment update",
      commentid: comment_id,
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .patch(`/api/okr/updatecomment/${kr_id}`)
      .send(updateComment)
      .set(headers)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual(`Comment Updated`);
      });
  });

  it("Update isLocked true of time period", async () => {
    await TimePeriod.findByIdAndUpdate(timePeriodId, {
      isLocked: true,
    });
  });

  it("DELETE /api/okr/deletekr/:okrid/:krsid (delete single kr with okrId and krId locked quarter) ", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .delete(`/api/okr/deletekr/${okr_id}/${kr_id}`)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(
          `Quarter Locked You Cannot Delete it!`
        );
      });
  });

  it("Update isLocked false of time period", async () => {
    await TimePeriod.findByIdAndUpdate(timePeriodId, {
      isLocked: false,
    });
  });

  it("DELETE /api/okr/deletekr/:okrid/:krsid (delete single kr with okrId and krId) ", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .delete(`/api/okr/deletekr/${okr_id}/${kr_id}`)
      .set(headers)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual(`key result is deleted`);
      });
  });

  it("DELETE /api/okr/deletekr/:okrid/:krsid (delete single kr with invalid okrId and krId) ", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .delete(`/api/okr/deletekr/${okr_id}/${kr_id}1`)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(`Invalid okr/krs id Provided`);
      });
  });

  it("Update isLocked true of time period", async () => {
    await TimePeriod.findByIdAndUpdate(timePeriodId, {
      isLocked: true,
    });
  });

  it("DELETE /api/okr/deleteokr/:okrid (delete okr with okrId locked quarter) ", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .delete(`/api/okr/deleteokr/${okr_id}`)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(
          `Quarter Locked You Cannot Delete it!`
        );
      });
  });

  it("Update isLocked false of time period", async () => {
    await TimePeriod.findByIdAndUpdate(timePeriodId, {
      isLocked: false,
    });
  });

  it("DELETE /api/okr/deleteokr/:okrid (delete okr with okrId) ", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .delete(`/api/okr/deleteokr/${okr_id}`)
      .set(headers)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual(
          `${response.body.data.objective} Objective is deleted`
        );
      });
  });

  it("DELETE /api/okr/deleteokr/:okrid (delete okr with invalid okrId) ", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .delete(`/api/okr/deleteokr/${okr_id}1`)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(`Invalid okr id Provided`);
      });
  });

  it("DELETE delete created time period", async () => {
    await TimePeriod.findByIdAndDelete(timePeriodId);
  });

  it("DELETE delete created activity feed of krs", async () => {
    await ActivityFeed.deleteOne({ id: kr_id });
  });

  it("DELETE delete created activity feed of new added krs", async () => {
    let last_krs_id = await ActivityFeed.find()
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(last_krs_id[0]._id.toString());
    await ActivityFeed.findByIdAndDelete(last_krs_id[0]._id.toString());
  });

  it("POST search user okr /api/okr/search (without error)", async () => {
    let searchUserOKr = {
      type:'individual',
      userId: constants.admin_id,
      quarter: constants.quarter_id,
    };
    const headers = {
      "x-access-token": auth_token,
    }; 
    await supertest(app)
      .post(`/api/okr/search`)
      .send(searchUserOKr)
      .set(headers)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual("Successfully Fetched the User's Objectives");
      });
  });

  it("DELETE /api/okr/deleteokr/:okrid (delete okr with okrId Error) ", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    Okr.findOne = jest.fn().mockImplementationOnce(() => {
      throw new Error();
    });
    await supertest(app)
      .delete(`/api/okr/deleteokr/${okr_id}1`)
      .set(headers)
      .expect(500)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(`SOMETHING WENT WRONG`);
      });
  });

  it("DELETE /api/okr/deletekr/:okrid/:krsid (delete single kr with okrId and krId Error) ", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    Okr.findOne = jest.fn().mockImplementationOnce(() => {
      throw new Error();
    });
    await supertest(app)
      .delete(`/api/okr/deletekr/${okr_id}/${kr_id}1`)
      .set(headers)
      .expect(500)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(`SOMETHING WENT WRONG`);
      });
  });

  it("PATCH /api/okr/updatecomment/:krid (update added comment with Error) ", async () => {
    let updateComment = {};
    const headers = {
      "x-access-token": auth_token,
    };
    Okr.findOne = jest.fn().mockImplementationOnce(() => {
      throw new Error();
    });
    await supertest(app)
      .patch(`/api/okr/updatecomment/${kr_id}`)
      .send(updateComment)
      .set(headers)
      .expect(500)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(`SOMETHING WENT WRONG`);
      });
  });

  it("PATCH /api/okr/addcomment/:krid (update add comment with Error) ", async () => {
    let commentBody = {};
    const headers = {
      "x-access-token": auth_token,
    };
    Okr.findOneAndUpdate = jest.fn().mockImplementationOnce(() => {
      throw new Error();
    });
    await supertest(app)
      .patch(`/api/okr/addcomment/${kr_id}`)
      .send(commentBody)
      .set(headers)
      .expect(500)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(`SOMETHING WENT WRONG`);
      });
  });

  it("PUT /api/okr/checkin/:krId (update checkIn and comment by krId Error) ", async () => {
    let krsBody = {};
    const headers = {
      "x-access-token": auth_token,
    };
    Okr.findOne = jest.fn().mockImplementationOnce(() => {
      throw new Error();
    });
    await supertest(app)
      .put(`/api/okr/checkin/${kr_id}`)
      .send(krsBody)
      .set(headers)
      .expect(500)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(`SOMETHING WENT WRONG`);
      });
  });

  it("PUT /api/okr/addkrs/:okrid (update add krs with Error) ", async () => {
    let addKrs = {};
    const headers = {
      "x-access-token": auth_token,
    };
    Okr.findOne = jest.fn().mockImplementationOnce(() => {
      throw new Error();
    });
    await supertest(app)
      .put(`/api/okr/${okr_id}1`)
      .send(addKrs)
      .set(headers)
      .expect(500)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(`SOMETHING WENT WRONG`);
      });
  });

  it("PUT /api/okr/:okrid (update Okr with Error) ", async () => {
    let createUser = {};
    const headers = {
      "x-access-token": auth_token,
    };
    User.findById = jest.fn().mockImplementationOnce(() => {
      throw new Error();
    });
    await supertest(app)
      .put(`/api/okr/${okr_id}1`)
      .send(createUser)
      .set(headers)
      .expect(500)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(`SOMETHING WENT WRONG`);
      });
  });

  it("POST /api/okr (Create Okr with Error) ", async () => {
    let createUser = {
      quarter: timePeriodId,
    };
    const headers = {
      "x-access-token": auth_token,
    };
    User.findById = jest.fn().mockImplementationOnce(() => {
      throw new Error();
    });
    await supertest(app)
      .post(`/api/okr`)
      .send(createUser)
      .set(headers)
      .expect(500)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual(`SOMETHING WENT WRONG`);
      });
  });

  it("GET /api/okr/checkin/company/summary?quarter=quarterId (with Error)", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    User.findById = jest.fn().mockImplementationOnce(() => {
      throw new Error();
    });
    await supertest(app)
      .get(`/api/okr/checkin/company/summary?quarter=${constants.quarter_id}`)
      .set(headers)
      .expect(500)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("SOMETHING WENT WRONG");
      });
  });

  it("GET /api/okr/checkin/summary?quarter=quarterId (with Error)", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    User.findById = jest.fn().mockImplementationOnce(() => {
      throw new Error();
    });
    await supertest(app)
      .get(`/api/okr/checkin/summary?quarter=${constants.quarter_id}`)
      .set(headers)
      .expect(500)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("SOMETHING WENT WRONG");
      });
  });

  it("GET /api/okr/:orkId (with error)", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    User.findById = jest.fn().mockImplementationOnce(() => {
      throw new Error();
    });
    await supertest(app)
      .get(`/api/okr/${constants.admin_okr_id}`)
      .set(headers)
      .expect(500)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("SOMETHING WENT WRONG");
      });
  });

  it("GET /api/okr?owner=userId&quarter=quaterId&type=individual (with Error)", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    User.findById = jest.fn().mockImplementationOnce(() => {
      throw new Error();
    });
    await supertest(app)
      .get(
        `/api/okr?owner=${constants.admin_id}&quarter=${constants.quarter_id}&type=individual`
      )
      .set(headers)
      .expect(500)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("SOMETHING WENT WRONG");
      });
  });

  it("POST search user okr /api/okr/search (with error)", async () => {
    let searchUserOKr = {
      type:"indidal",
      userId: constants.user_id,
      quarter: constants.quarter_id,
    };
    const headers = {
      "x-access-token": auth_token,
    }; 
    User.findById = jest.fn().mockImplementationOnce(() => {
      throw new Error();
    });
    await supertest(app)
      .post(
        `/api/okr/search`
      )
      .send(searchUserOKr)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("Failed to fetch User's Objectives");
      });
  });
});
