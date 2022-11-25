const supertest = require("supertest");
const { createServer } = require("../utility/server");
const app = createServer();
const mongoose = require("mongoose");
const constants = require("./constants");
const User = require("../modules/user/model");
const { setupDB } = require("./testSetup");

jest.mock("@sendgrid/mail");

setupDB();

describe("user test", () => {
  let auth_token;
  let loggedUserId = "";
  let createdUserEmail = "";
  res = {};

  it("POST /api/auth/login", async () => {
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

  it("GET api/user/getusers?role=userId (with invalid user id value)", async () => {
    const id = constants.user_id;
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(`/api/user/getusers?role=${id}1`)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("Invalid Role id Provided");
      });
  });

  it("GET api/user/getusers?role=userId (with user id value)", async () => {
    const id = constants.user_id;
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(`/api/user/getusers?role=${id}`)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("Failed to get Users");
      });
  });

  it("GET api/user/forgot?email=userEmail (with user Email value)", async () => {
    const email = "nishadsachin.m@valuebound.com";

    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(`/api/user/forgot?email=${email}`)
      .set(headers)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual("OTP has been sent on your mail");
      });
  });

  it("GET api/user/verifyotp?email=userEmail&otp=otpValue (with user Email and otp value)", async () => {
    const email = constants.user_data.email;
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(`/api/user/verifyotp?email=${email}&otp=2343`)
      .set(headers)
      .expect(500)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("Error Occurred");
      });
  });

  it("GET api/user/searchuser?name=searchTerm&status=true (with search value)", async () => {
    const searchTerm = "a";
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(`/api/user/searchuser?name=${searchTerm}&status=true`)
      .set(headers)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual("User Search Successfull");
      });
  });

  it("GET api/user/reporting-manager-list?user=userId (with user id value)", async () => {
    const userId = constants.user_id;
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(`/api/user/reporting-manager-list?user=${userId}`)
      .set(headers)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("success");
      });
  });

  it("GET api/user/my-profile", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .get(`/api/user/my-profile`)
      .set(headers)
      .expect(200)
      .then((response) => {
        loggedUserId = response.body.data._id;
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual("User Data Fetched Successfull");
      });
  });

  it("POST /api/user (Create User) ", async () => {
    let createUser = [
      {
        firstName: "testName",
        surname: "testSurname",
        email: "nishadsachin.m+1@valuebound.com",
      },
    ];
    createdUserEmail = createUser[0].email;
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .post(`/api/user`)
      .send(createUser)
      .set(headers)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual(
          "Created Users Data successfully"
        );
      });
  });

  it("POST /api/user (Create User for error) ", async () => {
    let createUser = [
      {
        firstName: "testName",
        surname: "testSurname",
        email: "nishadsachin.m+1@valuebound.com",
      },
    ];
    createdUserEmail = createUser[0].email;
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .post(`/api/user`)
      .send(createUser)
      .set(headers)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("error");
        expect(response.body.message).toEqual(
          "Failed to create User  (Check Created-User error list)"
        );
      });
  });

  it("PUT /api/user/:userId/setpassword (with admin Id value) ", async () => {
    let setPassword = {
      password: "test123",
      confirmPassword: "test123",
    };
    await supertest(app)
      .put(`/api/user/${loggedUserId}/setpassword`)
      .send(setPassword)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("Password Already Set!!");
      });
  });

  it("PUT /api/user/admin/update/:userId (with admin Id value) ", async () => {
    let updateUser = {
      firstName: "Kusuma",
      surname: "Lahari",
      email: "kusuma.s@valuebound.com",
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .put(`/api/user/admin/update/${loggedUserId}`)
      .send(updateUser)
      .set(headers)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual(
          `${updateUser.firstName}'s Profile is Updated`
        );
      });
  });

  it("PUT /api/user/admin/update/:userId (update without email value) ", async () => {
    let updateUser = {
      firstName: "Kusuma",
      surname: "Lahari",
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .put(`/api/user/admin/update/${loggedUserId}`)
      .send(updateUser)
      .set(headers)
      .expect(422)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual('"email" is required');
      });
  });

  it("PUT /api/user/admin/update/:userId (update with incorrect email value) ", async () => {
    let updateUser = {
      firstName: "Kusuma",
      surname: "Lahari",
      email: "kusuma.s@valuebound.commm",
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .put(`/api/user/admin/update/${loggedUserId}`)
      .send(updateUser)
      .set(headers)
      .expect(422)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual('"email" must be a valid email');
      });
  });

  it("PUT /api/user/admin/update/:userId (update with incorrect userId value) ", async () => {
    let updateUser = {
      firstName: "Kusuma",
      surname: "Lahari",
      email: "kusuma.s@valuebound.com",
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .put(`/api/user/admin/update/${loggedUserId}1`)
      .send(updateUser)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("Invalid user id Provided");
      });
  });

  it("PUT /api/user/update/:userId (update with userId value) ", async () => {
    let updateUser = {
      firstName: "Kusuma",
      surname: "Lahari",
      email: "kusuma.s@valuebound.com",
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .put(`/api/user/update/${loggedUserId}`)
      .send(updateUser)
      .set(headers)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual("Your Profile is Updated");
      });
  });

  it("PUT /api/user/update/:userId (update without email value) ", async () => {
    let updateUser = {
      firstName: "Kusuma",
      surname: "Lahari",
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .put(`/api/user/update/${loggedUserId}`)
      .send(updateUser)
      .set(headers)
      .expect(422)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual('"email" is required');
      });
  });

  it("PUT /api/user/update/:userId (update with incorrect email value) ", async () => {
    let updateUser = {
      firstName: "Kusuma",
      surname: "Lahari",
      email: "kusuma.s@valuebound.commm",
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .put(`/api/user/update/${loggedUserId}`)
      .send(updateUser)
      .set(headers)
      .expect(422)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual('"email" must be a valid email');
      });
  });

  it("PUT /api/user/update/:userId (update with incorrect userId value) ", async () => {
    let updateUser = {
      firstName: "Kusuma",
      surname: "Lahari",
      email: "kusuma.s@valuebound.com",
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .put(`/api/user/update/${loggedUserId}1`)
      .send(updateUser)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("Invalid user id Provided");
      });
  });

  it("PUT /api/user/changepassword (change password of logged in User) ", async () => {
    let changePassword = {
      oldPassword: "test123",
      newPassword: "test1234",
      confirmNewPassword: "test1234",
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .put(`/api/user/changepassword`)
      .send(changePassword)
      .set(headers)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual("Password Updated Successfully");
      });
  });

  it("PUT /api/user/changepassword (change password with incorrect old password) ", async () => {
    let changePassword = {
      oldPassword: "test123",
      newPassword: "test123",
      confirmNewPassword: "test123",
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .put(`/api/user/changepassword`)
      .send(changePassword)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("Old Password Doesn't Match");
      });
  });

  it("PATCH /api/user/inactive/:userId?type=deactivate (Deactivate User with UserId) ", async () => {
    const userName = await User.findById(constants.user_id).select("firstName");
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .patch(`/api/user/inactive/${constants.user_id}?type=deactivate`)
      .set(headers)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual(
          `${userName.firstName} is successfully Deactivated.`
        );
      });
  });

  it("PATCH /api/user/inactive/:userId?type=deactivate (Deactivate already inactive User with UserId) ", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .patch(`/api/user/inactive/${constants.user_id}?type=deactivate`)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("User Already Deactivated");
      });
  });

  it("PATCH /api/user/active/:userId (reactive User with UserId) ", async () => {
    const userName = await User.findById(constants.user_id);
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .patch(`/api/user/active/${constants.user_id}`)
      .set(headers)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual(
          `${userName.firstName} is Activated Successfully.`
        );
      });
  });

  it("PATCH /api/user/active/:userId (reactive active User with UserId) ", async () => {
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .patch(`/api/user/active/${constants.user_id}`)
      .set(headers)
      .expect(400)
      .then((response) => {
        expect(response.body.status).toEqual("failure");
        expect(response.body.message).toEqual("User is Already Active");
      });
  });

  it("PUT /api/user/changepassword (Reset password of logged in User) ", async () => {
    let changePassword = {
      oldPassword: "test1234",
      newPassword: "test123",
      confirmNewPassword: "test123",
    };
    const headers = {
      "x-access-token": auth_token,
    };
    await supertest(app)
      .put(`/api/user/changepassword`)
      .send(changePassword)
      .set(headers)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual("Password Updated Successfully");
      });
  });

  it("DELETE delete-created-user", async () => {
    await User.deleteOne({ email: createdUserEmail });
  });

  it("POST search user /api/user/search (without error)", async () => {
    let searchName ={
      name:"kus"
    }
    const headers = {
      "x-access-token": auth_token,
    }; 
    await supertest(app)
    .post(
      `/api/user/search`
    )
    .send(searchName)
    .set(headers)
    .expect(200)
    .then((response) => {
      expect(response.body.status).toEqual("success");
      expect(response.body.message).toEqual("Search Successfull");
    });
  });
});
