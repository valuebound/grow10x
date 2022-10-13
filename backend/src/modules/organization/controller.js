const Joi = require("joi");
const { nanoid } = require("nanoid");

const organizationModel = require("./model");
const userModel = require("../user/model");
const { customResponse, getAvatarUrl} = require("../../utility/helper");
const { sendEmail } = require("../../utility/generateEmail");
const { generateMessage } = require("../../utility/generateTemplate");
const { orgSignup_JoiSchema } = require("./schema");
const { userType } = require("../../models");
const { HTTP_CODES, ROLES, OKR_TYPES } = require("../../utility/constants");
const logger = require("../../utility/logger");
const User = require("../user/model");
const Okr = require("../okr/model");
const timePeriod = require("../timeperiod/model");
const sanitizer = require("sanitize")();
const moment = require('moment');
const {sum} = require('mathjs');
const { runCronWhenNotificationUpdates } = require("../../cron");


const createOrganizationAccount = async (req, res) => {
  let message;
  /**
   * Joi Validation
   */
  const { error } = orgSignup_JoiSchema.validate(req.body);
  if (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({
      code: HTTP_CODES.UNPROCESSABLE_ENTITY,
      message: "Validation Failed! Invalid request data",
      err: error,
    });
    return res.status(HTTP_CODES.UNPROCESSABLE_ENTITY).send(resData);
  }
  try {
    let randomPassword = nanoid(10);
    const userAdmin = {
      orgName: req.body.orgName,
      orgUsername: req.body.orgUsername,
      adminName: req.body.adminName,
      adminEmail: req.body.adminEmail,
      location: req.body.location,
      adminPhone: req.body.adminPhone,
      adminPhoneSecondary: req.body?.adminPhoneSecondary ? req.body?.adminPhoneSecondary : null ,
      orgType: req?.body?.orgType,
      password: randomPassword,
      createdAt: moment().format(),
    };
    const admins = await organizationModel(userAdmin);
    /**
     * Get Admin Role id From Db - userType Collection
     */
    const getRoleId = await userType.findOne({role: ROLES.ADMIN}, {_id:1, role:1});
    let first_name, new_surname
    if (req.body.adminName){
      let splitName = req.body.adminName.split(" ");
      first_name = splitName[0];
      new_surname = splitName[1];
    }
    const getAvatar = await getAvatarUrl(`${first_name}${new_surname}`);
    const adminUser = await userModel({
      firstName: first_name,
      surname: new_surname,
      user_name: req.body.orgUsername,
      email: req.body.adminEmail,
      organization: admins._id,
      location: req.body.location,
      phone: req.body?.adminPhone ? req.body?.adminPhone : null ,
      phoneSecondary: req.body?.adminPhoneSecondary ? req.body?.adminPhoneSecondary : null,
      role: getRoleId._id,
      password: randomPassword,
      verified: true,
      isAdmin: true,
      isActive: true,
      isDeleted: false,
      level: 0,
      avatar: getAvatar,
    });
    const savedOrgData = await admins.save();
    const responseData = {
      orgName: savedOrgData.orgName,
      orgUsername: savedOrgData.orgUsername,
      adminName: savedOrgData.adminName,
      adminEmail: savedOrgData.adminEmail,
    }
    adminUser.save();
    const emailMessage = await generateMessage(adminUser, randomPassword);
    await sendEmail(adminUser.email, `OKR Portal: Admin Account Created`, emailMessage);
    message = `Admin account created successfully!! for the organization ${req.body.orgName}`;

    const resData = customResponse({
      code :HTTP_CODES.CREATED,
      message,
      data: responseData
    });
    return res.status(HTTP_CODES.CREATED).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error);
    message = "something went wrong";
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message,
      err: {} });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
};

const getAllUsersAccount = async (req, res) => {
  try {
    const _id = req.userId;
    const user = await userModel.findById(_id);
    const role = req.decode.role;
    const getRole = await userType.findById(role,{_id:1, role:1});
    const orgExist = await organizationModel.findById({_id:user.organization});
    if (!orgExist){
      const resData = customResponse({
        code : HTTP_CODES.BAD_REQUEST,
        message: "Invalid Data Requested. Org Not Found!!",
        data: {}
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    let userData = [], admins=[];
    if (getRole.role == ROLES.ADMIN || req.decode.isAdmin ){
      admins = await userModel.find({ organization: user.organization , isDeleted:false });
      for( i=0; i<admins.length; i++){
        let surnameExist = admins[i].surname ? admins[i].surname: " ";
        let data = {
          name : `${admins[i]?.firstName} ${surnameExist}`,
          email : admins[i]?.email,
          phone : admins[i]?.phone,
          department : admins[i]?.role,
          designation: admins[i]?.designation,
          location: admins[i]?.location,
          isActive: admins[i]?.isActive,
          isAdmin: admins[i]?.isAdmin,
        }
        userData.push(data);
      }
    }
    else{
      admins = await userModel.find({ organization: user.organization , isActive: true });
      for( i=0; i<admins.length; i++){
        let surnameExist = admins[i]?.surname ? admins[i]?.surname: " ";
        let data = {
          name : `${admins[i]?.firstName} ${surnameExist}`,
          email : admins[i]?.email,
          phone : admins[i]?.phone,
          department : admins[i]?.role,
          designation: admins[i]?.designation,
          location: admins[i]?.location,
        }
        userData.push(data);
      }
    }

    const resData = customResponse({
      code : HTTP_CODES.SUCCESS,
      message: `${ admins.length } User's of My Org Fetched successfully!!`,
      data: userData
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: "Falied to get my organization User's account list",
      err: {}
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
};

const getOrganizationList = async(req, res) => {
  try {
    const getOrgData = await organizationModel.find({ isDeleted: false },{ password:0, __v:0 }).sort({ createdAt:-1 });
    const resData = customResponse({
      code : HTTP_CODES.SUCCESS,
      message: "Registered Organization's list",
      data: getOrgData
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: "Falied to get organization's list",
      err: {}
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
}

const updateMyOrg = async (req, res) => {
  try {
    const orgId = req.params.orgid;
    const updateOrg = await organizationModel.findByIdAndUpdate(
      orgId,
      {
        ...req.body
      },
      {
        new: true,
      }
    );
    /**
    if (updateOrg || updateOrg!== null ){
      await runCronWhenNotificationUpdates();
    }
     */
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: "My Organization Updated Successfully",
      data: updateOrg
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);

  } catch (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: "Falied to Update My Organization",
      err: {}
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
}

const getMyOrgProfile = async (req, res) => {
  try {
    const _id = req.userId;
    const user = await userModel.findById(_id);
    const orgId = user.organization;
    const getOrgData = await organizationModel.findById(
      orgId,
      {
        password:0, __v:0, isDeleted:0
      });
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: "Successfully Fetch My Org Profile",
      data: getOrgData
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);

  } catch (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: "Falied to Fetch My Org Profile",
      err: {}
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
}

const deleteOrg = async (req, res) => {
  try {
    const orgId = sanitizer.value(req.params.orgid, 'str');
    const deleteOrg = await organizationModel.findByIdAndUpdate(
      orgId,
      {
        isDeleted: true
      },
      {
        new: true,
      }
    );

    if (deleteOrg.isDeleted === true){
      const findUsers = await User.find({ organization: deleteOrg._id });
      for (let i =0 ; i< findUsers.length ; i++){
        const markDeleteUser = await User.findByIdAndUpdate(findUsers[i]._id, {isDeleted: true}, { new: true });
      }
    }
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: `${deleteOrg.orgName} organization is Deleted Successfully`,
      data: deleteOrg
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error);
    if (error.kind === 'ObjectId'){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "Invalid Org id Provided",
        err: {},
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: "Failed to Delete the Organization",
      err: {}
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
}

const orgChart = async (req, res) => {
  try {
    const _id = req.userId;
    const user = await User.findById(_id);
    const orgId = user.organization;
    const getAdminRoleId = await userType.findOne({ role: ROLES.ADMIN }, { _id:1 });
    const findOrgAdmin = await User.findOne({ role: getAdminRoleId._id, organization: orgId },
      {
        _id:1,
        firstName:1,
        surname:1,
        designation:1,
        whoReportsMe:1,
        isActive:1,
        isDeleted:1,
      });
    const getCurrentQuarter = await timePeriod.findOne({
      organization: orgId,
      isCurrent: true,
      isLocked: false,
      isDeleted: false,
    },
    {
      _id:1,
      name:1,
    }).sort({ timestamp:-1 });
    let currentQuarter = getCurrentQuarter?._id ? getCurrentQuarter._id : null;

    async function getUserData(data){
      let newData = [];
      for (let i = 0; i<data?.length ; i++){
        const findData = await User.findOne({_id: String(data[i]), isActive: true, isDeleted: false},
        {
          _id:1,
          firstName:1,
          surname:1,
          designation:1,
          whoReportsMe:1,
          avatar: 1,
        });
        if (findData && findData !== null ){
          const getOkrData = await Okr.find({ owner: findData._id, type: OKR_TYPES.INDIVIDUAL, quarter:currentQuarter, isDeleted:false });
          const statsData = await getStatsOfOkr(getOkrData, currentQuarter, orgId);
          let nested = [];
          if ( findData?.whoReportsMe && findData?.whoReportsMe?.length > 0){
            const res = await getUserData(findData.whoReportsMe);
            nested = res;
          }
          let Obj = {
            id: findData?._id,
            isActive: findData?.isActive,
            isDeleted: findData?.isDeleted,
            value: {
              name: `${findData?.firstName? findData?.firstName: ''} ${findData?.surname ? findData?.surname : ''}`,
              title: findData?.designation,
              items: statsData,
            },
            children: nested,
          }
          newData[i] = Obj;
        }
      }
      return newData;
    }
    const new_data = await getUserData(findOrgAdmin.whoReportsMe);
    const getOkrData = await Okr.find({ owner: findOrgAdmin._id, type: OKR_TYPES.INDIVIDUAL, quarter:currentQuarter, isDeleted:false });
    const statsData = await getStatsOfOkr(getOkrData, currentQuarter, orgId);
    let data = {
      id: findOrgAdmin._id,
      value: {
        name: `${findOrgAdmin.firstName? findOrgAdmin.firstName: ''} ${findOrgAdmin.surname ? findOrgAdmin.surname : ''}`,
        title: findOrgAdmin.designation,
        items: statsData ? statsData : [],
      },
      children: new_data ? new_data : []
    }

    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: "Successfully Fetch the Org Chart",
      data: data
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error.stack);
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: "Failed to Fetch the Organization Chart",
      err: {}
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
}

async function getStatsOfOkr(okrData, quarter, orgID){
  try{
    let total_okr = 0, total_krs = 0;
    let obj_status_done = 0,obj_status_onTrack= 0, obj_status_behind = 0, obj_status_atRisk = 0;
    let kr_status_done = 0,kr_status_onTrack= 0, kr_status_behind = 0, kr_status_atRisk = 0;
    const getQuarterData = await timePeriod.findOne({
      _id: quarter,
      organization: orgID,
      isDeleted: false,
    },
    {
      _id:1,
      name:1,
      startDate:1,
      endDate:1
    });

    if (getQuarterData === null){
      let res = {
        totalObjective: 0,
        objectiveDone: 0,
        objectiveAtRisk: 0,
        objectiveBehind: 0,
        objectiveOnTrack: 0,
        totalKrs : 0,
        krDone: 0,
        krAtRisk: 0,
        krBehind: 0,
        krOnTrack: 0,
        overallProgress : 0,
        overallStatus : "",
      }
      return res;
    }
      if ( okrData && okrData.length > 0 ){
          let current_date, current_duration, end_date, expected_kr, start_date, total_duration;
          start_date = moment(getQuarterData.startDate).format("YYYY-MM-DD");
          end_date = moment(getQuarterData.endDate).format("YYYY-MM-DD");
          current_date = moment().format("YYYY-MM-DD");
          total_duration = moment(end_date).diff(moment(start_date), 'days');

          current_duration = moment(current_date).diff(moment(start_date), 'days');
          expected_kr = current_duration / total_duration * 100;
          expected_kr = Math.round(expected_kr);

          function get_status(current, expected) {
              let v;
              if (current === 100){
                  return "done"
              }
              else if (expected <= current) {

                  return "onTrack";
              } else {
                  if (expected > current) {
                  v = expected - current;

                  if (v > 15) {
                      return "atRisk";
                  } else {
                      return "behind";
                  }
                  }
              }
          }

          function get_kr_status(current_value, start_value, target_value) {
            let current_kr, status;
            current_kr = ((current_value - start_value) / (target_value - start_value)) * 100;
            current_kr = Math.round(current_kr);
            status = get_status(current_kr, expected_kr);
            if (status === "done"){
              kr_status_done = kr_status_done + 1;
            }
            else if (status === "onTrack"){
              kr_status_onTrack = kr_status_onTrack + 1;
            }
            else if (status === "atRisk"){
              kr_status_atRisk = kr_status_atRisk + 1;
            }
            else if (status === "behind"){
              kr_status_behind = kr_status_behind + 1;
            }
            return [status, current_kr];
          }

          function get_objective_status(data) {
            let cur_obj, new_data, status;
            new_data = [];
            let kr_data=[]
            for (let j=0; j<data.length; j++){
              let data1 = get_kr_status(data[j].currentValue, data[j].start, data[j].target);
              new_data.push(data1[1]);
              kr_data.push({
                krsId : data[j]._id.toString(),
                keyResult : data[j].keyResult,
                krProgress : data1[1],
                status : data1[0] ? data1[0] : '',
                start: data[j].start,
                currentValue: data[j].currentValue,
                target: data[j].target,
                isBoolean: data[j].isBoolean,
                unit: data[j].unit,
                krComments: data[j].comment,
              })
              total_krs = total_krs + 1;
            }
            cur_obj = sum(new_data) / new_data.length;
            cur_obj = Math.round(cur_obj);
            status = get_status(cur_obj, expected_kr);
            if (status === "done"){
              obj_status_done = obj_status_done + 1;
            }
            else if (status === "onTrack"){
              obj_status_onTrack = obj_status_onTrack + 1;
            }
            else if (status === "atRisk"){
              obj_status_atRisk = obj_status_atRisk + 1;
            }
            else if (status === "behind"){
              obj_status_behind = obj_status_behind + 1;
            }
            return [cur_obj, status, kr_data];
          }

          function get_overall_status(data) {
              let cur_overall, new_data, status;
              let OBJ_ARRAY = [];
              new_data = [];
              for (let i = 0; i<data.length; i++) {
                  let obj_data = get_objective_status(data[i].krs);
                  let POST_DATA = {
                      okrObjectiveId : data[i]._id.toString(),
                      okrObjective : data[i].objective,
                      okrType: data[i].type,
                      krs : obj_data[2],
                      okrProgress: obj_data[0],
                      okrStatus: obj_data[1] ? obj_data[1] : '',
                      okrOwner: data[i].owner,
                      quarter: data[i].quarter,
                      okrCreatedAt: data[i].createdAt,
                      okrUpdatedAt: data[i].updatedAt,
                      okrComments: data[i].comment,
                  }
                  OBJ_ARRAY.push(POST_DATA);

                  new_data.push(obj_data[0]);
                  total_okr = total_okr + 1;
              }
              cur_overall = sum(new_data) / new_data.length;
              cur_overall = Math.round(cur_overall);
              status = get_status(cur_overall, expected_kr);
              let res = JSON.stringify({
                totalObjective: total_okr,
                objectiveDone: obj_status_done,
                objectiveAtRisk: obj_status_atRisk,
                objectiveBehind: obj_status_behind,
                objectiveOnTrack: obj_status_onTrack,
                totalKrs : total_krs,
                krDone: kr_status_done,
                krAtRisk: kr_status_atRisk,
                krBehind: kr_status_behind,
                krOnTrack: kr_status_onTrack,
                overallProgress : cur_overall,
                overallStatus : status ? status : '',
              })
              return res;
          }

          const newData = get_overall_status(okrData);
           let res1 = JSON.parse(newData);
          logger.customLogger.log('info', `Success with okr's data`);
          return res1;

      }
      else if (okrData.length === 0){
        logger.customLogger.log('info', `Success with no okr's`);
        let res = {
          totalObjective: 0,
          objectiveDone: 0,
          objectiveAtRisk: 0,
          objectiveBehind: 0,
          objectiveOnTrack: 0,
          totalKrs : 0,
          krDone: 0,
          krAtRisk: 0,
          krBehind: 0,
          krOnTrack: 0,
          overallProgress : 0,
          overallStatus : "",
        }
        return res;
      }

  }
  catch(error) {
    logger.customLogger.log('info', `Error - ${error}`);
  }
}

const getCompanyDetails = async (req, res) => {
  try {
    const _id = req.userId;
    const user = await userModel.findById(_id);
    const orgId = user.organization;
    const getOrgData = await organizationModel.findById(orgId,
      {
        vision:1,
        mission:1,
        coreValues:1,
        companyBrief:1,
        orgName:1,
      }
    )
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: "Successfully Fetch the Organization Details",
      data: getOrgData
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error.stack);
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: "Failed to Fetch the Organization Details",
      err: {}
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
}

const updateCompanyDetails = async(req, res) => {
  try {
    const _id = req.userId;
    const user = await userModel.findById(_id);
    const orgId = user.organization;
    const updateOrgData = await organizationModel.findByIdAndUpdate(orgId,
      {
        vision: req?.body?.vision,
        mission: req?.body?.mission,
        coreValues: req?.body?.coreValues,
        companyBrief: req?.body?.companyBrief,
      },
      {
        new: true
      }
    )
    const responseData = {
      _id : updateOrgData._id,
      orgName: updateOrgData.orgName,
      vision: updateOrgData.vision,
      mission: updateOrgData.mission,
      coreValues: updateOrgData.coreValues,
      companyBrief: updateOrgData.companyBrief,
    }
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: "Successfully Update the Organization Details",
      data: responseData
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error.stack);
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: "Failed to Update the Organization Details",
      err: {}
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
}


module.exports = {
  createOrganizationAccount,
  getAllUsersAccount,
  getOrganizationList,
  updateMyOrg,
  getMyOrgProfile,
  deleteOrg,
  orgChart,
  getStatsOfOkr,
  getCompanyDetails,
  updateCompanyDetails,
};
