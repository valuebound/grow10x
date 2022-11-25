const User = require("./model");
const bcrypt = require("bcryptjs");
const {
  customResponse,
  customPagination,
  signToken,
  getRefreshToken,
  getAvatarUrl,
  getStatsOfOkrWithoutOkrList,
} = require("../../utility/helper");
const {
  ROLES,
  HTTP_CODES,
  ERROR_MESSAGES,
  OKR_TYPES,
} = require("../../utility/constants");
const { sendEmail } = require("../../utility/generateEmail");
const {
  generateMessageInviteTemplate,
  generateSendOtpTemplate,
  generateSuccessUpdatePassword,
} = require("../../utility/generateTemplate");
const {
  addUser_JoiSchema,
  login_JoiSchema,
  importUserSchema,
  changePasswordSchema,
  setPassword_schema,
  updateUserProfile_JoiSchema,
  updateSelfProfile,
} = require("./schema");
const { OAuth2Client } = require("google-auth-library");
const Organization = require("../organization/model");
const timePeriod = require("../timeperiod/model");
const client = new OAuth2Client();
const { nanoid, customAlphabet } = require("nanoid");
const { userType } = require("../../models");
const logger = require("../../utility/logger");
const readXlsxFile = require("read-excel-file/node");
global.__basedir = __dirname + "/..";
const csv = require("csvtojson");
const { promisify } = require("util");
const fs = require("fs");
const unlinkAsync = promisify(fs.unlink);
const sanitizer = require("sanitize")();
const { env } = require("../../config/environment");
const Okr = require("../okr/model");
const config = require(`../../config/${env}.config`);
const CryptoJS = require("crypto-js");
const UserType = require("../userType/model");

/**
 * Function to handle user's Login
 * @param {*} req
 * @param {*} res
 * @returns userDetail
 */
const loginOld = async (req, res) => {
  let code, message, data;

  let googleVerified = false;

  if (req.body.idToken) {
    await client
      .verifyIdToken({
        idToken: req.body.idToken,
        audience: config.GOOGLE_CLIENT_ID,
      })
      .then((res) => {
        googleVerified = true;
        req.body.email = res.payload.email;
      });
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    const userDetail = {};
    if (!user) {
      message = "Invalid request data";
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message,
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    } else {
      if (user.isActive === true && user.isDeleted === false) {
        const accessToken = await signToken(user);
        const refreshToken = await getRefreshToken(user);
        let doesPasswordMatch;
        if (!googleVerified || req?.query?.source !== "google") {
          doesPasswordMatch = await bcrypt.compare(
            req.body.password,
            user.password
          );
          if (!doesPasswordMatch) {
            const resData = customResponse({
              code: HTTP_CODES.BAD_REQUEST,
              message: "Password Doesn't Match",
              data,
            });
            return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
          }
        }
        if (
          doesPasswordMatch ||
          (googleVerified && req?.query?.source === "google")
        ) {
          let googleId = req?.body?.googleid ? req.body.googleid : null;
          if (googleId) {
            const updateGoogleID = await User.findOneAndUpdate(
              { email: req.body.email },
              {
                google_id: googleId,
              },
              { new: true }
            );
          }
          code = HTTP_CODES.SUCCESS;
          const updateToken = await User.findOneAndUpdate(
            { email: req.body.email },
            {
              $push: {
                token: accessToken,
                refreshToken: refreshToken,
              },
            },
            { new: true }
          );

          if (updateToken.role === ROLES.SUPER_ADMIN) {
            const userDetail = {};
            userDetail.firstName = updateToken.firstName;
            userDetail.email = updateToken.email;
            userDetail.role = updateToken.role;
            userDetail.accessToken = accessToken;
            userDetail.refreshToken = refreshToken;
            userDetail.userId = updateToken._id;
            userDetail.isAdmin = updateToken.isAdmin;

            const resData = customResponse({
              code: HTTP_CODES.SUCCESS,
              message,
              data: userDetail,
            });
            return res.status(HTTP_CODES.SUCCESS).send(resData);
          }

          const orgName = await Organization.findById(
            { _id: updateToken.organization },
            { orgName: 1 }
          );
          userDetail.firstName = updateToken.firstName;
          userDetail.email = updateToken.email;
          userDetail.role = updateToken.role;
          userDetail.accessToken = accessToken;
          userDetail.refreshToken = refreshToken;
          userDetail.organization = orgName;
          userDetail.passwordChanged = updateToken.passwordChanged;
          userDetail.userid = updateToken._id;
          userDetail.isAdmin = updateToken.isAdmin;
        } else {
          code = HTTP_CODES.UNPROCESSABLE_ENTITY;
          message = "Invalid request data";
          data = customResponse({
            code,
            message,
          });
          return res.status(code).send(data);
        }
        message = "Logged-In Successfully!";
        const resData = customResponse({
          code: HTTP_CODES.SUCCESS,
          message,
          data: userDetail,
        });
        return res.status(HTTP_CODES.SUCCESS).send(resData);
      } else {
        const resData = customResponse({
          code: HTTP_CODES.BAD_REQUEST,
          message: `You Can't Login. Please Contact Your Org Admin.`,
          data: {},
        });
        return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
      }
    }
  } catch (error) {
    message = "Internal server error";
    const resData = customResponse({
      code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      message,
      err: {},
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

/**
 * Function to handle User's Logout
 * @param {*} req
 * @param {*} res
 */
const logout = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const logoutSuccess = await User.findOneAndUpdate(
      {
        token: token,
      },
      {
        $pull: {
          token: req.headers["x-access-token"],
          refreshToken: req.headers.refresh,
        },
      },
      { new: true }
    );
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: "Logged-Out Successfully!",
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log("error", error);
    message = "Internal Server Error";
    const resData = customResponse({
      code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      message,
    });
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

/**
 * Get full User's List to Assign Reporting Manager in the ORG.
 * @param {*} req
 * @param {*} res
 */
const getReportingManagerList = async (req, res) => {
  try {
    const role = req.decode.role;
    const getRole = await userType.findById(role, { _id: 1, role: 1 });
    const _id = req.userId;
    const queryUserId = sanitizer.value(req.query.user, "str");
    const user = await User.findById(_id);
    const orgId = req?.query?.orgid ? req?.query?.orgid : user.organization;
    const allUsers = await User.find({
      organization: orgId,
      isActive: true,
      isDeleted: false,
    });

    if (!queryUserId || queryUserId === "" || queryUserId === null) {
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: `Invalid User Id Provided`,
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const userData = [];
    for (i = 0; i < allUsers.length; i++) {
      if (String(allUsers[i]._id) !== String(queryUserId)) {
        let surnameExist = allUsers[i].surname ? allUsers[i].surname : "";
        let data = {
          id: allUsers[i]._id,
          name: `${allUsers[i].firstName} ${surnameExist}`,
          email: allUsers[i].email,
          designation: allUsers[i].designation,
        };
        userData.push(data);
      }
    }
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: `${userData.length} user details Fetched`,
      data: userData,
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log("error", error);
    const resData = customResponse({
      code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
      err: {},
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

const addUser = async (req, res) => {
  const _id = req.userId;
  const adminData = await User.findById(_id, {
    _id: 0,
    firstName: 1,
    surname: 1,
    organization: 1,
  });
  const allData = [];
  let UsersResult = [];
  let importError = [];
  const orgId = req?.query?.orgid ? req?.query?.orgid : adminData.organization;
  const length = Object.keys(req.body).length;
  const getAdminRoleId = await userType.findOne(
    { role: ROLES.ADMIN },
    { _id: 1, role: 1 }
  );
  const defaultManager = await User.findOne(
    { organization: orgId, role: getAdminRoleId._id },
    { _id: 1 }
  );
  /**
   * get user role id from userTypes
   */
  const getUserRoleId = await userType.findOne(
    { role: ROLES.USER },
    { _id: 1, role: 1 }
  );
  /**
   * JOI validation
   */
  const { error } = addUser_JoiSchema.validate(req.body);
  if (error) {
    const resData = customResponse({
      code: HTTP_CODES.UNPROCESSABLE_ENTITY,
      message: error.message,
      err: {},
    });
    return res.status(HTTP_CODES.UNPROCESSABLE_ENTITY).send(resData);
  }
  try {
    for (i = 0; i < length; i++) {
      const getAvatar = await getAvatarUrl(
        `${req.body[i].firstName}${req.body[i].surname}`
      );
      let randomPassword = nanoid(10);
      const new_user = await User({
        firstName: req.body[i].firstName,
        surname: req.body[i].surname,
        email: req.body[i].email,
        organization: orgId,
        role: getUserRoleId._id,
        reportingManager: req?.body[i]?.reportingManager
          ? req.body[i].reportingManager
          : defaultManager._id,
        password: randomPassword,
        verified: true,
        avatar: getAvatar,
      });

      try {
        const save_data = await new_user.save();
        /**
         * Add User in Who Reports Me Array
         */
        const updateWhoReportsMe = await User.findByIdAndUpdate(
          new_user.reportingManager,
          {
            $push: {
              whoReportsMe: new_user._id,
            },
          },
          {
            new: true,
          }
        );
        UsersResult.push({ index: i, message: save_data.email });
        const emailMessage = await generateMessageInviteTemplate(
          new_user,
          adminData,
          randomPassword
        );
        await sendEmail(
          new_user.email,
          `GROW10X: Account Created`,
          emailMessage
        );
      } catch (err) {
        importError.push({
          index: i,
          message: `Account already created for email, ${err?.keyValue?.email}`,
        });
      }
    }
    return res.status(HTTP_CODES.SUCCESS).send({
      code: HTTP_CODES.SUCCESS,
      status: importError.length
        ? UsersResult.length
          ? "warning"
          : "error"
        : "success",
      message: importError.length
        ? UsersResult.length
          ? "success with Error, few users account failed to create (Check Created-User error list)"
          : "Failed to create User  (Check Created-User error list)"
        : "Created Users Data successfully",
      data: UsersResult,
      error: importError.length
        ? { errorName: "mongo-error", importError }
        : { errorName: null, importError: [] },
    });
  } catch (error) {
    logger.customLogger.log("error", error);
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: "UNABLE TO SIGNUP",
      err: {},
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
};

const refreshToken = async (req, res) => {
  const refreshToken = req.headers.refresh;
  try {
    const userExist = await User.findOne({
      refreshToken: refreshToken,
    });
    if (userExist) {
      const newAccessToken = await signToken(req.decode);
      const newRefreshToken = await getRefreshToken(req.decode);
      const updateToken = await User.findOneAndUpdate(
        { email: req.decode.email },
        {
          token: newAccessToken,
          refreshToken: newRefreshToken,
        },
        { new: true }
      );
      const data = {
        firstName: updateToken.firstName,
        email: updateToken.email,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        orgId: updateToken.organization,
      };
      message = "Access Token and its details";
      const resData = customResponse({
        code: HTTP_CODES.SUCCESS,
        message,
        data,
      });
      return res.status(HTTP_CODES.SUCCESS).send(resData);
    } else {
      message = "Invalid Token";
      const resData = customResponse({
        code: HTTP_CODES.UNAUTHORIZED,
        message,
      });
      return res.status(HTTP_CODES.UNAUTHORIZED).send(resData);
    }
  } catch (error) {
    logger.customLogger.log("error", error);
    message = "Bad Request";
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message,
      err: {},
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
};

/**
 * Function to Get User's list Based on Role
 * @param {role, orgId} req
 * @param {*} res
 * @returns list of users
 */
const getUsersRoleBased = async (req, res) => {
  try {
    const role = req?.query?.role;
    const _id = req.userId;
    const user = await User.findById(_id);
    const orgId = req?.query?.orgid ? req?.query?.orgid : user.organization;
    if (role) {
      const user = await User.find(
        { role: role, organization: orgId, isActive: true, isDeleted: false },
        { firstName: 1, surname: 1 }
      ).populate("role", { _id: 1, role: 1 });
      const resData = customResponse({
        code: HTTP_CODES.SUCCESS,
        message: `${user[0].role.role} Role User's Data is Fetched Successfully`,
        data: user,
      });
      return res.status(HTTP_CODES.SUCCESS).send(resData);
    } else {
      const resData = customResponse({
        code: HTTP_CODES.SUCCESS,
        message: "Role Not Found",
        data: {},
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
  } catch (error) {
    logger.customLogger.log("error", `${error}`);
    if (error.kind === "ObjectId") {
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "Invalid Role id Provided",
        err: {},
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: "Failed to get Users",
      err: {},
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
};

/**
 * Function to Set New Password.
 * @param {params.userId} req
 * @param {*} res
 * @returns
 */
const setPassword = async (req, res) => {
  try {
    const user_id = sanitizer.value(req.params.userid, "str");
    const findUser = await User.findById(
      { _id: user_id },
      { passwordChanged: 1, role: 1, email: 1, otpVerified: 1 }
    ).populate("role", { _id: 1, role: 1 });

    if (!findUser) {
      const resdata = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "Bad Request User Not Found",
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resdata);
    }
    const password = req.body.password;
    const password1 = req.body.confirmPassword;

    /**
     * Joi Validation
     */
    const { error } = setPassword_schema.validate(req.body);
    if (error) {
      const resData = customResponse({
        code: HTTP_CODES.UNPROCESSABLE_ENTITY,
        message: error.message,
        err: {},
      });
      return res.status(HTTP_CODES.UNPROCESSABLE_ENTITY).send(resData);
    }
    let passwordMatch = true;
    if (password != password1) {
      passwordMatch = false;
      const resdata = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "Password Not matched",
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resdata);
    }

    if (passwordMatch && !findUser.passwordChanged && findUser.otpVerified) {
      const user = await User.findOneAndUpdate(
        { _id: user_id },
        { password: password, passwordChanged: true },
        { new: true }
      );
      await user.save();

      const emailMessage = await generateSuccessUpdatePassword();
      sendEmail(user.email, `GROW10X: Password Changed`, emailMessage);

      /**
       * Set password in Organization Collection if Role is Admin
       */
      if (findUser.role.role === ROLES.ADMIN) {
        const org = await Organization.findOneAndUpdate(
          { adminEmail: findUser.email },
          { password: password },
          { new: true }
        );
        if (org){
          await org.save();
        }
      }
      const resData = customResponse({
        code: HTTP_CODES.SUCCESS,
        data: {},
        message: "Password Set Successfully",
      });
      return res.status(HTTP_CODES.SUCCESS).send(resData);
    } else {
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        data: {},
        message: "Password Already Set!!",
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
  } catch (error) {
    logger.customLogger.log("error", `${error}`);
    if (error.kind === "ObjectId") {
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "Invalid user id Provided",
        err: {},
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const resData = customResponse({
      code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
      err: {},
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

/**
 * Function to reset User's account password when forgot password is requested.
 * @param {query.email} req
 */
const resetPassword = async (req, res) => {
  const email = sanitizer.value(req.query.email, "email");
  if (email === null) {
    const resdata = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: "Invalid Email",
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resdata);
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user || user.length === 0) {
      const resdata = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "User not registered. Please Register",
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resdata);
    }

    if (user.verified === true && user.isActive === true) {
      /**
       * Send email Function
       */
      let otp = customAlphabet("1234567890", 4);
      let randomOTP = otp();
      const userUpdate = await User.findOneAndUpdate(
        { email: email },
        {
          otp: randomOTP,
          otpVerified: false,
        },
        { new: true }
      );
      const emailMessage = await generateSendOtpTemplate(user, randomOTP);
      sendEmail(user.email, `GROW10X: OTP for Reset Password`, emailMessage);

      const resData = customResponse({
        code: HTTP_CODES.SUCCESS,
        message: "OTP has been sent on your mail",
      });
      return res.status(HTTP_CODES.SUCCESS).send(resData);
    } else {
      const resdata = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "User not Verified or Inactive",
        data: { verifed: user.verified, accountStatus: user.isActive },
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resdata);
    }
  } catch (error) {
    logger.customLogger.log("error", `${error}`);
    const resData = customResponse({
      code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: "Error Occurred",
      err: {},
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

/**
 * Function to mark the user as deactivated/ deleted.
 * @param {orgid, userid} req
 */
const inactiveUser = async (req, res) => {
  const _id = req.userId;
  const user = await User.findById(_id);
  const orgId = req?.query?.orgid ? req?.query?.orgid : user.organization;
  const user_id = sanitizer.value(req.params.userid, "str");
  const type = sanitizer.value(req.query.type, "str");
  try {
    const findUser = await User.findOne({ _id: user_id, organization: orgId });
    if (!findUser || findUser === null) {
      const resdata = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "User Not Found",
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resdata);
    }
    let markInactive;
    if (type === "deactivate") {
      if (findUser.isActive === false) {
        const resdata = customResponse({
          code: HTTP_CODES.BAD_REQUEST,
          message: "User Already Deactivated",
        });
        return res.status(HTTP_CODES.BAD_REQUEST).send(resdata);
      }
      markInactive = await User.findOneAndUpdate(
        { _id: user_id, organization: orgId },
        {
          whoReportsMe: [],
          isActive: false,
        },
        { new: true }
      );
    } else if (type === "delete") {
      if (findUser.isActive === true) {
        const resdata = customResponse({
          code: HTTP_CODES.BAD_REQUEST,
          message: "User Already Deleted",
        });
        return res.status(HTTP_CODES.BAD_REQUEST).send(resdata);
      }
      markInactive = await User.findOneAndUpdate(
        { _id: user_id, organization: orgId },
        {
          whoReportsMe: [],
          isDeleted: true,
        },
        { new: true }
      );
    }

    if (markInactive.isActive === false || markInactive.isDeleted === true) {
      /**
       * Removing Reporting manager of markInactive user from whoReportsMe Array.
       */
      const removeFromWhoReportsMe = await User.findByIdAndUpdate(
        markInactive.reportingManager,
        {
          $pull: {
            whoReportsMe: markInactive._id,
          },
        },
        {
          new: true,
        }
      );
      /**
       * Assigning New Reporting Manager
       */
      let newManager = markInactive.reportingManager;
      const findUsersUnderMe = await User.find({
        reportingManager: markInactive._id,
      });
      if (findUsersUnderMe && findUsersUnderMe.length > 0) {
        for (let i = 0; i < findUsersUnderMe.length; i++) {
          const updateManager = await User.findOneAndUpdate(
            { _id: findUsersUnderMe[i]._id },
            {
              reportingManager: newManager,
            },
            { new: true }
          );
          /**
           * Add User in Who Reports Me Array
           */
          const updateWhoReportsMe = await User.findByIdAndUpdate(
            newManager,
            {
              $push: {
                whoReportsMe: findUsersUnderMe[i]._id,
              },
            },
            {
              new: true,
            }
          );
        }
      }
    }
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message:
        type === "deactivate"
          ? `${markInactive.firstName} is successfully Deactivated.`
          : `${markInactive.firstName} is successfully Deleted.`,
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log("error", `${error}`);
    const resData = customResponse({
      code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: "Error Occurred",
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

/**
 * Put Request for Updating User's Profile
 * @param {req.params.userId} req
 * @param {*} res
 */
const updateUserProfile = async (req, res) => {
  try {
    const userId = sanitizer.value(req.params.userid, "str");
    const findUserRole = await User.findById(
      { _id: req.userId },
      { role: 1 }
    ).populate("role", { _id: 1, role: 1 });

    const { error } = updateSelfProfile.validate(req.body);
    if (error) {
      const resData = customResponse({
        code: HTTP_CODES.UNPROCESSABLE_ENTITY,
        message: error.message,
        err: {},
      });
      return res.status(HTTP_CODES.UNPROCESSABLE_ENTITY).send(resData);
    }
    let updateData;
    if (findUserRole.role.role === ROLES.ADMIN) {
      updateData = await User.findByIdAndUpdate(
        { _id: userId },
        {
          firstName: req?.body?.firstName,
          surname: req?.body?.surname,
          userName: req?.body?.userName,
          location: req?.body?.location,
          phone: req?.body?.phone,
          phoneSecondary: req?.body?.phoneSecondary,
          gender: req?.body?.gender,
          dob: req?.body?.dob,
          designation: req?.body?.designation,
          projectDetails: req?.body?.projectDetails,
          about: req?.body?.about,
        },
        { new: true }
      );
    } else {
      updateData = await User.findByIdAndUpdate(
        { _id: userId },
        {
          firstName: req?.body?.firstName,
          surname: req?.body?.surname,
          userName: req?.body?.userName,
          location: req?.body?.location,
          phone: req?.body?.phone,
          phoneSecondary: req?.body?.phoneSecondary,
          gender: req?.body?.gender,
          dob: req?.body?.dob,
          projectDetails: req?.body?.projectDetails,
          about: req?.body?.about,
        },
        { new: true }
      );
    }

    /**
     * Update User Data in Organization Model as well
     */
    const ifExistUserInOrgModel = await Organization.findOne({ adminEmail: updateData?.email }).count();
    if (ifExistUserInOrgModel > 0){
      const updateDatainOrgModel = await Organization.findOneAndUpdate(
        { 
          adminEmail: updateData?.email
        },
        {
          adminName: `${updateData?.firstName} ${updateData?.surname}`,
          adminPhone: updateData?.phone,
          location: updateData?.location,
        },
        { new: true }
      );
    }
    /**
     * Update Avatar based on Gender
     */
    if (req?.body?.gender === "Male") {
      const avatar = `https://avatars.dicebear.com/api/male/${req?.body?.firstName}${req?.body?.surname}.svg?mood[]=happy&background=%23EE6C4DFF`;
      const updateAvatar = await User.findByIdAndUpdate(
        {
          _id: userId,
        },
        {
          avatar: avatar,
        },
        { new: true }
      );
    } else if (req?.body?.gender === "Female") {
      const avatar = `https://avatars.dicebear.com/api/female/${req?.body?.firstName}${req?.body?.surname}.svg?mood[]=happy&background=%23EE6C4DFF`;
      const updateAvatar = await User.findByIdAndUpdate(
        {
          _id: userId,
        },
        {
          avatar: avatar,
        },
        { new: true }
      );
    }
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: `Your Profile is Updated`,
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log("error", `${error}`);
    if (error.kind === "ObjectId") {
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "Invalid user id Provided",
        err: {},
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const resData = customResponse({
      code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: "Error Occurred",
      err: {},
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

/**
 * Put Request for Updating User's Profile By Admin
 * @param {req.params.userId} req
 * @param {*} res
 */
const updateUserProfileByAdmin = async (req, res) => {
  try {
    const userId = req.params.userid;
    const role = req.body.role.toUpperCase()
    const getRoleId = await UserType.findOne({role:role},{_id:1})
    /**
     * Get Old User Data
     */
    const getOldDataOfUser = await User.findById(userId, {
      reportingManager: 1,
      email: 1,
      role:1
    });
    const newReportingManagerFromBody = req?.body?.reportingManager;
    const { error } = updateUserProfile_JoiSchema.validate(req.body);
    if (error) {
      const resData = customResponse({
        code: HTTP_CODES.UNPROCESSABLE_ENTITY,
        message: error.message,
        err: {},
      });
      return res.status(HTTP_CODES.UNPROCESSABLE_ENTITY).send(resData);
    }
    /**
     * Email Duplicate Validation
     */
    if (getOldDataOfUser.email !== req?.body?.email) {
      const checkEmailExist = await User.findOne({
        email: req.body.email,
      }).count();
      if (checkEmailExist > 0) {
        const resData = customResponse({
          code: HTTP_CODES.UNPROCESSABLE_ENTITY,
          message: `Email '${req.body.email}' is already exist`,
          err: {},
        });
        return res.status(HTTP_CODES.UNPROCESSABLE_ENTITY).send(resData);
      }
    }

    const updateData = await User.findByIdAndUpdate(
      { _id: userId },
      {
        firstName: req?.body?.firstName,
        surname: req?.body?.surname,
        userName: req?.body?.userName,
        email: req?.body?.email,
        role: getRoleId ? getRoleId : getOldDataOfUser.role,//req?.body?.role,
        location: req?.body?.location,
        phone: req?.body?.phone,
        teams: req?.body?.teams,
        projectLead: req?.body?.projectLead,
        verified: req?.body?.verified,
        reportingManager: req?.body?.reportingManager,
        whoReportsMe: req?.body?.whoReportsMe,
        lastFeedback: req?.body?.lastFeedback,
        phoneSecondary: req?.body?.phoneSecondary,
        gender: req?.body?.gender,
        dob: req?.body?.dob,
        designation: req?.body?.designation,
        projectDetails: req?.body?.projectDetails,
      },
      { new: true }
    );
    /**
     * Update User Data in Organization Model as well
     */
    const ifExistUserInOrgModel = await Organization.findOne({ adminEmail: updateData?.email }).count();
    if (ifExistUserInOrgModel > 0){
      const updateDatainOrgModel = await Organization.findOneAndUpdate(
        { 
          adminEmail: updateData?.email
        },
        {
          adminName: `${updateData?.firstName} ${updateData?.surname}`,
          adminPhone: updateData?.phone,
          location: updateData?.location,
        },
        { new: true }
      );
    }
    /**
     * Check if the Reporting Manager is new or not.
     */
    if (
      String(getOldDataOfUser?.reportingManager) !==
      String(newReportingManagerFromBody)
    ) {
      /**
       * If Reporting Manager is not equal
       * Remove it from current WhoReportsMe Array.
       */
      const removeFromWhoReportsMe = await User.findByIdAndUpdate(
        getOldDataOfUser?.reportingManager,
        {
          $pull: {
            whoReportsMe: userId,
          },
        },
        {
          new: true,
        }
      );
      /**
       * Add User in Who Reports Me Array of New Reporting Manager
       */
      const updateWhoReportsMe = await User.findByIdAndUpdate(
        updateData?.reportingManager,
        {
          $push: {
            whoReportsMe: updateData?._id,
          },
        },
        {
          new: true,
        }
      );
    }

    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: `${updateData.firstName}'s Profile is Updated`,
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log("error", `${error}`);
    if (error.kind === "ObjectId") {
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "Invalid user id Provided",
        err: {},
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const resData = customResponse({
      code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: "Error Occurred",
      err: {},
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const email = sanitizer.value(req.body.email, "email");
    if (email === null) {
      const resdata = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "Invalid Email",
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resdata);
    }
    const otp = sanitizer.value(req.body.otp, "str");
    const otpDecrypt = CryptoJS.AES.decrypt(otp, config.CRYPTO_SECRET);
    const originalText = otpDecrypt.toString(CryptoJS.enc.Utf8);
    if (originalText.toString().length !== 4) {
      const resdata = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "Invalid Otp",
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resdata);
    }
    const findUser = await User.findOne({ email: email });

    if (!findUser || findUser.length === 0) {
      const resdata = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "User Not Found",
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resdata);
    }
    if (findUser.otpVerified === false) {
      const verifyOTPinDB = await User.findOneAndUpdate(
        {
          email: email,
          otp: originalText,
        },
        {
          otpVerified: true,
          passwordChanged: false,
        },
        { new: true }
      );
      if (verifyOTPinDB?._id) {
        const resData = customResponse({
          code: HTTP_CODES.SUCCESS,
          message: `OTP Verified`,
          data: { userid: verifyOTPinDB?._id },
        });
        return res.status(HTTP_CODES.SUCCESS).send(resData);
      } else {
        const resData = customResponse({
          code: HTTP_CODES.BAD_REQUEST,
          message: `OTP Not Verified. Please Enter Valid OTP`,
        });
        return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
      }
    } else {
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: `OTP Verification Failed`,
        data: {},
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
  } catch (error) {
    logger.customLogger.log("error", error.stack);
    const resData = customResponse({
      code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: "Error Occurred",
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

const changePassword = async (req, res) => {
  try {
    let userId = req.userId;
    /**
     * JOI validation
     */
    const { error } = changePasswordSchema.validate(req.body);
    if (error) {
      const resData = customResponse({
        code: HTTP_CODES.UNPROCESSABLE_ENTITY,
        message: error.message,
        err: {},
      });
      return res.status(HTTP_CODES.UNPROCESSABLE_ENTITY).send(resData);
    }
    const oldPass = req.body.oldPassword;
    const newPass = req.body.newPassword;
    const confirmNewPass = req.body.confirmNewPassword;

    const findUser = await User.findById({ _id: userId });

    if (!findUser || findUser.length === 0) {
      const resdata = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "User Not Found",
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resdata);
    }
    let doesPasswordMatch;
    doesPasswordMatch = await bcrypt.compare(oldPass, findUser.password);

    if (!doesPasswordMatch) {
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "Old Password Doesn't Match",
        data: {},
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }

    if (doesPasswordMatch && newPass === confirmNewPass) {
      const updatePassword = await User.findOneAndUpdate(
        { _id: userId },
        { password: confirmNewPass },
        { new: true }
      );
      await updatePassword.save();
      const resData = customResponse({
        code: HTTP_CODES.SUCCESS,
        message: `Password Updated Successfully`,
        data: {},
      });
      return res.status(HTTP_CODES.SUCCESS).send(resData);
    } else {
      const resdata = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "New Password didn't match",
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resdata);
    }
  } catch (error) {
    logger.customLogger.log("error", error);
    const resData = customResponse({
      code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: "Error Occurred",
      err: {},
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

/**
 * Search Based Fetch Users Based on name
 * @param {*} req
 * @param {*} res
 */
const userSearchbyName = async (req, res) => {
  try {
    let paginatedData;
    const _id = req.userId;
    const user = await User.findById(_id);
    const orgId = req?.query?.orgid ? req?.query?.orgid : user.organization;
    const name = sanitizer.value(req.query.name, "str");
    const status = sanitizer.value(req.query.status, "str");
    const limitNo = sanitizer.value(req?.query?.limit, "int");
    const page = sanitizer.value(req?.query?.page, "int");
    let getUsersConcat, getAllUsersData;
    const getCurrentQuarter = await timePeriod
      .findOne(
        {
          organization: orgId,
          isCurrent: true,
          isLocked: false,
          isDeleted: false,
        },
        {
          _id: 1,
          name: 1,
        }
      )
      .sort({ timestamp: -1 });
    let currentQuarter = getCurrentQuarter?._id ? getCurrentQuarter._id : null;
    let userData = [];
    if (name.length !== 0) {
      getUsersConcat = await User.aggregate([
        { $project: { name: { $concat: ["$firstName", " ", "$surname"] }, org:"$organization" } },
        { $match: { name: new RegExp(name, "i") } },
      ]);
      paginatedData = customPagination(getUsersConcat, limitNo, page);
      for (let i = 0; i < paginatedData?.results?.length; i++) {
        let findUserFromFirstName = await User.findOne({
          _id: paginatedData?.results[i]?._id,
          organization: orgId,
          isActive: status === "true"? true: status === "false"? false : null,
          isDeleted: false,
        })
          .populate("teams", { _id: 1, teamName: 1 })
          .populate("role", { _id: 1, role: 1 })
          .populate("reportingManager", {
            _id: 1,
            firstName: 1,
            surname: 1,
            avatar: 1,
            designation: 1,
            phone: 1,
            email: 1,
          });
        if (findUserFromFirstName && findUserFromFirstName?._id) {
          const getOkrData = await Okr.find({
            owner: findUserFromFirstName?._id,
            type: OKR_TYPES.INDIVIDUAL,
            quarter: currentQuarter,
          });
          statsData = await getStatsOfOkrWithoutOkrList(getOkrData, currentQuarter, orgId);
          let data = {
            _id: findUserFromFirstName?._id,
            firstName: findUserFromFirstName?.firstName,
            surname: findUserFromFirstName?.surname,
            email: findUserFromFirstName?.email,
            role: findUserFromFirstName?.role,
            location: findUserFromFirstName?.location,
            phone: findUserFromFirstName?.phone,
            reportingManager: findUserFromFirstName?.reportingManager,
            isActive: findUserFromFirstName?.isActive,
            avatar: findUserFromFirstName?.avatar,
            okrStats: statsData,
            designation: findUserFromFirstName?.designation,
            userName: findUserFromFirstName?.userName,
          };
          userData.push(data);
        }
      }
    } else {
      getAllUsersData = await User.find({
        organization: orgId,
        isActive: status === "true"? true: status === "false"? false : null,
        isDeleted: false,
      })
        .populate("teams", { _id: 1, teamName: 1 })
        .populate("role", { _id: 1, role: 1 })
        .populate("reportingManager", {
          _id: 1,
          firstName: 1,
          surname: 1,
          avatar: 1,
          designation: 1,
          phone: 1,
          email: 1,
        })
        .sort({ firstName: 1 });
      paginatedData = customPagination(getAllUsersData, limitNo, page);
      const getAllUsers = paginatedData.results;
      for (i = 0; i < getAllUsers?.length; i++) {
        if (getAllUsers && getAllUsers[i]?._id) {
          const getOkrData = await Okr.find({
            owner: getAllUsers[i]?._id,
            type: OKR_TYPES.INDIVIDUAL,
            quarter: currentQuarter,
          });
          statsData = await getStatsOfOkrWithoutOkrList(getOkrData, currentQuarter, orgId);
          let data = {
            _id: getAllUsers[i]?._id,
            firstName: getAllUsers[i]?.firstName,
            surname: getAllUsers[i]?.surname,
            role: getAllUsers[i]?.role,
            email: getAllUsers[i]?.email,
            location: getAllUsers[i]?.location,
            phone: getAllUsers[i]?.phone,
            reportingManager: getAllUsers[i]?.reportingManager,
            isActive: getAllUsers[i]?.isActive,
            avatar: getAllUsers[i]?.avatar,
            okrStats: statsData,
            designation: getAllUsers[i]?.designation,
            userName: getAllUsers[i]?.userName,
          };
          userData.push(data);
        }
      }
    }
    const count = getUsersConcat?.length ? getUsersConcat?.length : getAllUsersData; 
    const resultCount = userData?.length;
    const totalPagesCount = paginatedData?.pageCount;
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: `User Search Successfull`,
      data: { allMembers: userData,resultCount, count, totalPagesCount },
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log("error", error.stack);
    const resData = customResponse({
      code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: "Error Occurred",
      err: {},
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

const myDetails = async (req, res) => {
  try {
    const _id = req.userId;
    const findUser = await User.findById(_id, {
      token: 0,
      /**
        refreshToken:0,
         */
      otp: 0,
      passwordChanged: 0,
      verified: 0,
      otpVerified: 0,
      __v: 0,
      password: 0,
      isActive: 0,
      isAdmin: 0,
      isDeleted: 0,
      current_okrs: 0,
      projectDetails: 0,
      lastFeedback: 0,
    })
      .populate("role", { _id: 1, role: 1 })
      .populate("organization", { _id: 1, orgName: 1 })
      .populate("teams", { _id: 1, teamName: 1 })
      .populate("reportingManager", { _id: 1, firstName: 1, surname: 1 })
      .populate("projectLead", { _id: 1, firstName: 1, surname: 1 })
      .populate("whoReportsMe", { _id: 1, firstName: 1, surname: 1 });
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: `User Data Fetched Successfull`,
      data: findUser,
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log("error", error);
    const resData = customResponse({
      code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: "Error Occurred",
      err: {},
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

const login = async (req, res) => {
  try {
    let message, data;
    let googleVerified = false;
    if (req.body.googleAuthToken) {
      await client
        .verifyIdToken({
          idToken: req.body.googleAuthToken,
          audience: config.GOOGLE_CLIENT_ID,
        })
        .then((res) => {
          googleVerified = true;
          req.body.email = res.payload.email;
        });
    }
    /**
     * Joi Validation
     */
    const { error } = login_JoiSchema.validate(req.body);
    if (error) {
      const resData = customResponse({
        code: HTTP_CODES.UNPROCESSABLE_ENTITY,
        message: error.message,
        err: {},
      });
      return res.status(HTTP_CODES.UNPROCESSABLE_ENTITY).send(resData);
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      message = "User Not Found";
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message,
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    } else {
      if (user.isDeleted === true) {
        const resData = customResponse({
          code: HTTP_CODES.BAD_REQUEST,
          message: "User is Deactivated",
        });
        return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
      } else if (user.isActive === true && user.isDeleted === false) {
        const accessToken = await signToken(user);
        let doesPasswordMatch;
        if (!googleVerified) {
          doesPasswordMatch = await bcrypt.compare(
            req.body.password,
            user.password
          );
          if (!doesPasswordMatch) {
            const resData = customResponse({
              code: HTTP_CODES.BAD_REQUEST,
              message: "Password Doesn't Match",
              data,
            });
            return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
          }
        }
        if (
          doesPasswordMatch ||
          googleVerified ||
          req?.query?.source === "google"
        ) {
          let googleId = req?.body?.googleid ? req.body.googleid : null;
          if (googleId) {
            const updateGoogleID = await User.findOneAndUpdate(
              { email: req.body.email },
              {
                google_id: googleId,
              },
              { new: true }
            );
          }
          code = HTTP_CODES.SUCCESS;
          const updateToken = await User.findOneAndUpdate(
            { email: req.body.email },
            {
              $push: {
                token: accessToken,
              },
            },
            { new: true }
          );
          message = "Logged-In Successfully!";
          const resData = customResponse({
            code: HTTP_CODES.SUCCESS,
            message,
            data: { accessToken },
          });
          logger.customLogger.log("info", "Login Success");
          return res.status(HTTP_CODES.SUCCESS).send(resData);
        }
      } else {
        const resData = customResponse({
          code: HTTP_CODES.BAD_REQUEST,
          message: `You Can't Login. Please Contact Your Org Admin.`,
          data,
        });
        return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
      }
    }
  } catch (error) {
    logger.customLogger.log("error", `${error}`);
    const resData = customResponse({
      code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: "Error Occurred",
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

const getLoggedinDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const role = req.decode.role;
    const getRole = await userType.findById(role, { _id: 1, role: 1 });
    let userDetail = {};
    if (
      getRole.role &&
      (getRole.role === ROLES.ADMIN || getRole.role === ROLES.USER)
    ) {
      const getData = await User.findById(userId)
        .populate("organization", { _id: 1, orgName: 1 , logo:1, logoUrl:1,})
        .populate("role", { _id: 1, role: 1 });
      userDetail.firstName = getData.firstName;
      userDetail.email = getData.email;
      userDetail.role = getData.role;
      userDetail.organization = getData.organization;
      userDetail.passwordChanged = getData.passwordChanged;
      userDetail.userid = getData._id;
      userDetail.isAdmin = getData.isAdmin;
      userDetail.avatar = getData.avatar;
      userDetail.tokenIssue = req.decode.iat;
      userDetail.tokenExp = req.decode.exp;
      const resData = customResponse({
        code: HTTP_CODES.SUCCESS,
        message: "Data fetched Successfully",
        data: userDetail,
      });
      logger.customLogger.log("info", "Logged in User Details Fetched");
      return res.status(HTTP_CODES.SUCCESS).send(resData);
    } else if (getRole.role && getRole.role === ROLES.SUPER_ADMIN) {
      const getData = await User.findById(userId).populate("role", {
        _id: 1,
        role: 1,
      });
      userDetail.firstName = getData.firstName;
      userDetail.email = getData.email;
      userDetail.role = getData.role;
      userDetail.userid = getData._id;
      userDetail.avatar = getData.avatar;
      userDetail.tokenIssue = req.decode.iat;
      userDetail.tokenExp = req.decode.exp;
      const resData = customResponse({
        code: HTTP_CODES.SUCCESS,
        message: "Data fetched Successfully",
        data: userDetail,
      });
      logger.customLogger.log("info", "Login Details Fetched Super Admin");
      return res.status(HTTP_CODES.SUCCESS).send(resData);
    } else {
      throw "Failed to fetch User-details";
    }
  } catch (error) {
    logger.customLogger.log("error", `${error}`);
    const resData = customResponse({
      code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: "Error Occurred",
      err: error,
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

const createUserWhileImport = async (req, res) => {
  const _id = req.userId;
  const adminData = await User.findById(_id, {
    _id: 0,
    firstName: 1,
    surname: 1,
    organization: 1,
  });
  const orgId = req?.query?.orgid ? req?.query?.orgid : adminData.organization.toString();
  /*
  make sure imported data from excel is an array in array of user data with email should be in email field
  and First Name should be in fistName field & Surname in surname field.. check below example
  example:-r[
  [ 'firstName', 'surname', 'email' ],
  [ 'Abc', 'Xyz', 'abc@valuebound.com' ],
  [ 'Div', 'Kum', 'div@valuebound.com' ],
  [ 'Joel', 'Vinay', 'joel@valuebound.com' ]
]
  */
  /**
   * Adding Delay of 5 sec
   */
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  try {
    const getAdminRoleId = await userType.findOne(
      { role: ROLES.ADMIN },
      { _id: 1, role: 1 }
    );
    const defaultManager = await User.findOne(
      { organization: orgId, role: getAdminRoleId._id },
      { _id: 1 }
    );
    let UsersResult = [];
    let importError = [];
    let successImportData = [];
    /**
     * get user role id from userTypes
     */
    const getUserRoleId = await userType.findOne(
      { role: ROLES.USER },
      { _id: 1, role: 1 }
    );

    async function getReportingManager(name, email) {
      if (name && email) {
        let splitName = name.split(" ");
        let splitNameLength = splitName.length;
        let fName = splitName[0];
        let sname = splitName[splitNameLength - 1];
        const findUserByEmail = await User.findOne(
          {
            organization: orgId,
            isActive: true,
            isDeleted: false,
            email: email,
          },
          { _id: 1 }
        );
        /**
        const findUserFirstName = await User.find({ organization: orgId, isActive:true, isDeleted:false, firstName: new RegExp(fName, 'i') },{_id:1});
        const findUserSurname = await User.find({ organization: orgId, isActive:true, isDeleted:false, surname: new RegExp(sname, 'i') },{_id:1});
         */
        if (!findUserByEmail || findUserByEmail === null) {
          try {
            let randomPassword = nanoid(10);
            const getAvatar = await getAvatarUrl(`${fName}${sname}`);
            const createUser = await User({
              firstName: fName,
              surname: sname,
              email: email,
              organization: orgId,
              password: randomPassword,
              role: getUserRoleId._id.toString(),
              reportingManager: defaultManager._id,
              avatar: getAvatar,
            }).save();
            /**
             * Add User in Who Reports Me Array
             */
            const updateWhoReportsMe = await User.findByIdAndUpdate(
              createUser.reportingManager,
              {
                $push: {
                  whoReportsMe: createUser._id,
                },
              },
              {
                new: true,
              }
            );
            UsersResult.push({ message: createUser.email });
            const emailMessage = await generateMessageInviteTemplate(
              createUser,
              adminData,
              randomPassword
            );
            await sendEmail(
              createUser.email,
              `GROW10X: Account Created`,
              emailMessage
            );
            return createUser._id.toString();
          } catch (error) {
            importError.push({
              message: `Account already created for email, ${error?.keyValue?.email}`,
            });
          }
        } else if (findUserByEmail?._id) {
          return findUserByEmail?._id.toString();
        }
      } else {
        return String(defaultManager._id);
      }
    }
    /**
     * if File is not there.
     */
    if (req.file === undefined) {
      return res.status(400).send("Please upload an excel/csv file!");
    }
    let path = __basedir + "/uploads/ExcelSheets/" + req.file.filename;
    let fileData;
    if (req.file.mimetype.includes("text/csv")) {
      /**
       * For CSV File
       */
      fileData = await csv().fromFile(path);

      for (let i = 0; i < fileData.length; i++) {
        let randomPassword = nanoid(10);
        const getAvatar = await getAvatarUrl(
          `${fileData[i].firstName}${fileData[i].surname}`
        );

        let userData = {
          firstName: fileData[i].firstName,
          surname: fileData[i].surname,
          email: fileData[i].email,
          organization: orgId,
          password: randomPassword,
          role: getUserRoleId._id.toString(),
          reportingManager: await getReportingManager(
            fileData[i]?.reportingManager,
            fileData[i]?.managerEmail
          ),
          avatar: getAvatar,
        };
        let arrayOfJoiError = [];
        const { error } = importUserSchema.validate(userData);
        if (error)
          arrayOfJoiError.push({
            index: i,
            validationError: error?.details.map((el) => el.message),
          });
        if (arrayOfJoiError.length) {
          let code = 206;
          let errorName = "joi-error";
          let message = "Inadequate Data (Check User error list)";
          const resData = {
            code,
            status: "error",
            message,
            error: {
              errorName,
              importError: arrayOfJoiError,
            },
          };
          return res.status(code).send(resData);
        }
        /**
         * create user also handle errors
         */
        try {
          const result = new User(userData);
          await result.save();
          /**
           * Add User in Who Reports Me Array
           */
          const updateWhoReportsMe = await User.findByIdAndUpdate(
            result.reportingManager,
            {
              $push: {
                whoReportsMe: result._id,
              },
            },
            {
              new: true,
            }
          );
          UsersResult.push({ index: i, message: result.email });
          /**
          successImportData.push({
            firstName: result.firstName,
            surname: result.surname,
            email: result.email,
            password: randomPassword,
          });
           */
          const emailMessage = await generateMessageInviteTemplate(
            result,
            adminData,
            randomPassword
          );
          await sendEmail(
            result.email,
            `GROW10X: Account Created`,
            emailMessage
          );
        } catch (err) {
          importError.push({
            index: i,
            message: `Account already created for email, ${err?.keyValue?.email}`,
          });
        }
      }
    } else {
      /**
       * For Excel File. .xlsx
       */
      fileData = await readXlsxFile(path);
      fileData.shift();
      for (let k = 0; k < fileData.length; k++) {
        let randomPassword = nanoid(10);
        const getAvatar = await getAvatarUrl(
          `${fileData[k][0]}${fileData[k][1]}`
        );
        let userData = {
          firstName: fileData[k][0],
          surname: fileData[k][1],
          email: fileData[k][2],
          organization: orgId,
          password: randomPassword,
          role: getUserRoleId._id.toString(),
          reportingManager: await getReportingManager(
            fileData[k][3],
            fileData[k][4]
          ),
          avatar: getAvatar,
        };
        let arrayOfJoiError = [];
        const { error } = importUserSchema.validate(userData);
        if (error)
          arrayOfJoiError.push({
            index: k,
            validationError: error?.details.map((el) => el.message),
          });
        if (arrayOfJoiError.length) {
          let code = 206;
          let errorName = "joi-error";
          let message = "Inadequate Data (Check User error list)";
          const resData = {
            code,
            status: "error",
            message,
            error: {
              errorName,
              importError: arrayOfJoiError,
            },
          };
          return res.status(code).send(resData);
        }

        try {
          const result = new User(userData);
          await result.save();
          /**
           * Add User in Who Reports Me Array
           */
          const updateWhoReportsMe = await User.findByIdAndUpdate(
            result.reportingManager,
            {
              $push: {
                whoReportsMe: result._id,
              },
            },
            {
              new: true,
            }
          );
          UsersResult.push({ index: k, message: result.email });
          /**
          successImportData.push({
            firstName: result.firstName,
            surname: result.surname,
            email: result.email,
            password: randomPassword,
          });
           */
          const emailMessage = await generateMessageInviteTemplate(
            result,
            adminData,
            randomPassword
          );
          await sendEmail(
            result.email,
            `GROW10X: Account Created`,
            emailMessage
          );
        } catch (err) {
          importError.push({
            index: k,
            message: `Account already created for email, ${err?.keyValue?.email}`,
          });
        }
      }
    }
    /**
     * Sending EMails

    if (successImportData.length > 0){
      for (let k = 0; k<successImportData.length; k++){
        const emailMessage = await generateMessageInviteTemplate(successImportData[k], adminData, successImportData[k].password);
        await sendEmail(successImportData[k].email, `GROW10X: Account Created`, emailMessage);
        // await delay(5000);
      }
    }
    */

    /**
     * Delete Excel Sheet/ Csv
     */
    await unlinkAsync(path);
    return res.status(HTTP_CODES.SUCCESS).send({
      code: HTTP_CODES.SUCCESS,
      status: importError.length
        ? UsersResult.length
          ? "warning"
          : "error"
        : "success",
      message: importError.length
        ? UsersResult.length
          ? "success with Error, few users account failed to create (Check Created-User error list)"
          : "Failed to create User  (Check Created-User error list)"
        : "Created Users Data successfully",
      data: UsersResult,
      error: importError.length
        ? { errorName: "mongo-error", importError }
        : { errorName: null, importError: [] },
    });
  } catch (error) {
    logger.customLogger.log("error", error);
    let message = "Failed To Upload File";
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({
      code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      message,
    });
  }
};

const activateUser = async (req, res) => {
  try {
    const _id = req.userId;
    const user = await User.findById(_id);
    const orgId = req?.query?.orgid ? req?.query?.orgid : user.organization;
    const activeUserId = sanitizer.value(req.params.userid, "str");
    const getAdminRoleId = await userType.findOne(
      { role: ROLES.ADMIN },
      { _id: 1, role: 1 }
    );
    const defaultManager = await User.findOne(
      { organization: orgId, role: getAdminRoleId._id },
      { _id: 1 }
    );
    const activateUserfromDb = await User.findById(activeUserId);

    if (!activateUserfromDb && activateUserfromDb !== null) {
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: `User Not Found`,
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    } else if (activateUserfromDb.isActive === true) {
      let message = "User is Already Active";
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message,
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    } else if (activateUserfromDb.isDeleted === true) {
      let message = "User is Already Deleted";
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message,
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }

    const activateUser = await User.findByIdAndUpdate(
      activeUserId,
      {
        isActive: true,
        reportingManager: defaultManager._id,
      },
      {
        new: true,
      }
    );

    if (activateUser && activateUser !== null) {
      /**
       * Add User in Who Reports Me Array
       */
      const updateWhoReportsMe = await User.findByIdAndUpdate(
        defaultManager._id,
        {
          $push: {
            whoReportsMe: activateUser._id,
          },
        },
        {
          new: true,
        }
      );
    }
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: `${activateUser.firstName} is Activated Successfully.`,
      data: activateUser,
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log("error", error);
    let message = "Failed to Activate the User";
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: message,
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
};

/**
 * Search by Name. Only Active Users to find user's OKR (for parent OKR)
 */
const searchByName = async (req, res) => {
  try {
    const _id = req.userId;
    const user = await User.findById(_id);
    const orgId = req?.query?.orgid ? req?.query?.orgid : user.organization;
    const name = sanitizer.value(req.body.name, "str");

    let findUserFromName = await User.find({ 
      _id: {$ne: _id},
      organization: orgId, 
      isActive: true, 
      isDeleted:false, 
      $or: [ { surname: new RegExp(name, 'i') }, { firstName: new RegExp(name, 'i') } ],
    },
    {
      _id: 1,
      firstName: 1,
      surname: 1,
      avatar: 1,
    });

    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: `${findUserFromName.length} User's Found. Search Successfull`,
      data: findUserFromName,
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log("error", error);
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: `Failed To Search User`,
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
};

module.exports = {
  loginOld,
  logout,
  addUser,
  getReportingManagerList,
  refreshToken,
  getUsersRoleBased,
  setPassword,
  resetPassword,
  inactiveUser,
  updateUserProfile,
  updateUserProfileByAdmin,
  verifyOtp,
  changePassword,
  userSearchbyName,
  myDetails,
  login,
  getLoggedinDetails,
  createUserWhileImport,
  activateUser,
  searchByName,
};
