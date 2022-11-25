const jwt = require("jsonwebtoken");
const dbmodel = require('../models/index');
const User = require("../modules/user/model");
const userType = dbmodel.userType;
const { ROLES,PERMISSIONS } = require("../utility/constants");
const { customLogger } = require("./logger");
const { env } = require('../config/environment');
const config = require(`../config/${env}.config`);
const Okr = require("../modules/okr/model");
const timePeriod = require("../modules/timeperiod/model");
const moment = require('moment');
const {sum} = require('mathjs');
/**
 * @ Custom Response Helper
 */
const customResponse = ({ code = 200, message = "", data = {}, err = {} }) => {
  const responseStatus = code < 300 ? "success" : "failure";
  return {
    status: responseStatus,
    code: code,
    message: message,
    data: data,
    error: err,
  };
};

/**
 * @ Custom Pagination Helper
 */
const customPagination = (data , limit = 15, page = 1) => {
  const totalCount = data.length;
  const pageCount = Math.ceil(totalCount / limit);
  const currentPage = page;
  const results = data.slice((page - 1) * limit, page * limit);
  return {
    pageCount,
    totalCount,
    currentPage,
    results,
  };
};

/**
 * @ JWT Token Helper Function
 */
async function signToken(user){
  const payload = {
    user_id: user._id,
    email: user.email,
    role: user.role,
    isAdmin: user.isAdmin
  };
  const options = {
    audience: config.ISSUER,
    expiresIn: config.EXPIRESIN
  }
  const token = jwt.sign(payload, config.JWT_SECRET, options);
  return token;
}

/**
 * @ JWT Refresh Token Helper Function
 */
 async function getRefreshToken(user){
  const payload = {
    user_id: user._id,
    email: user.email,
    role: user.role
  };
  const options = {
    audience: config.ISSUER,
    expiresIn: config.REFRESH_EXPIRESIN
  }
  const token = jwt.sign(payload, config.JWT_SECRET, options);
  return token;
}

/**
 * This Function will create Roles in UserTypes Collection if not there.
 */
async function initial() {
  const getSuperAdminCount = await userType.find({role: ROLES.SUPER_ADMIN}).count();
  if (getSuperAdminCount === 0){
    const saveSuperAdmin = new userType({
      role: ROLES.SUPER_ADMIN,
      permission:PERMISSIONS.SUPER_ADMIN
    });
    saveSuperAdmin.save();
    if (saveSuperAdmin._id){
      const email = config.SUPER_ADMIN_EMAIL;
      const password = config.SUPER_ADMIN_PASSWORD;
      const getSuperAdminCount = await User.find({ email: email }).count();
      const getAvatar = await getAvatarUrl('Admin');
      if (getSuperAdminCount === 0){
        const data = await User({
          firstName: 'Admin',
          email: email,
          password: password,
          role: saveSuperAdmin._id,
          avatar: getAvatar,
          }).save();
          customLogger.log('info',`email:${data.email}, password:${password}`);
      }
    }
  }
  const getAdminCount = await userType.find({role: ROLES.ADMIN}).count();
  if (getAdminCount === 0){
    const saveAdmin = new userType({
      role: ROLES.ADMIN,
      permission:PERMISSIONS.ADMIN
    });
    saveAdmin.save();
  }
  const getUserCount = await userType.find({role: ROLES.USER}).count();
  if (getUserCount === 0){
    const saveUser = new userType({
      role: ROLES.USER,
      permission:PERMISSIONS.USER
    });
    saveUser.save();
  } 
}

async function getMonthNo(month){
  switch(month){
    case 'SUNDAY':
      return 0;
    case 'MONDAY':
      return 1;
    case 'TUESDAY':
      return 2;
    case 'WEDNESDAY':
      return 3;
    case 'THURSDAY' :
      return 4;
    case 'FRIDAY':
      return 5;
    case 'SATURDAY':
      return 6;
    default:
      return 0;
  }
}

async function getAvatarUrl (name) {
  return `https://avatars.dicebear.com/api/avataaars/${name}.svg?mood[]=happy&background=%23EE6C4DFF`
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

          async function get_status(current, expected) {
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

          async function get_kr_status(current_value, start_value, target_value) {
              let current_kr, status;
              current_kr = ((current_value - start_value) / (target_value - start_value)) * 100;
              current_kr = Math.round(current_kr);
              status = await get_status(current_kr, expected_kr);
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

          async function get_objective_status(data) {
              let cur_obj, new_data, status;
              new_data = [];
              let kr_data=[]
              for (let j=0; j<data.length; j++){
                  let data1 = await get_kr_status(data[j].currentValue, data[j].start, data[j].target);
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
              status = await get_status(cur_obj, expected_kr);
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

          async function get_overall_status(data) {
              let cur_overall, new_data, status;
              let OBJ_ARRAY = [];
              new_data = [];
              let parentOkrData;
              for (let i = 0; i<data.length; i++) {
                  let obj_data = await get_objective_status(data[i].krs);
                  let okrWhichParentToMe = await Okr.find({ parent: data[i]._id }).populate("owner", {
                    _id: 1,
                    firstName: 1,
                    surname:1,
                    avatar: 1,
                    manager: 1,
                    organization: 1,
                  })
                  .populate("parent", { _id: 1, owner:1, objective:1, type:1, quarter:1 })
                  .populate("krs.comment.commentedBy", { _id: 1, firstName: 1,
                    surname:1, avatar:1});
                  if (okrWhichParentToMe){
                    parentOkrData = await get_overall_status(okrWhichParentToMe);
                  }
                  let POST_DATA = {
                      parentOkr: data[i].parent,
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
                      childOkrs:  JSON.parse(parentOkrData).okrs ? JSON.parse(parentOkrData).okrs : []
                  }
                  OBJ_ARRAY.push(POST_DATA);

                  new_data.push(obj_data[0]);
                  total_okr = total_okr + 1;
              }
              cur_overall = sum(new_data) / new_data.length;
              cur_overall = Math.round(cur_overall);
              status = await get_status(cur_overall, expected_kr);
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
                okrs : OBJ_ARRAY
              })
              return res;
          }

          const newData = await get_overall_status(okrData);
          let res1 = JSON.parse(newData);
          customLogger.log('info', `Success with okr's data`);
          return res1;

      }
      else if (okrData.length === 0){
        customLogger.log('info', `Success with no okr's`);
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
          okrs : []
        }
        return res;
      }

  }
  catch(error) {
    customLogger.log('info', `Error - ${error}`);
  }
}

async function getStatsOfOkrWithoutOkrList(okrData, quarter, orgID){
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

          async function get_status(current, expected) {
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

          async function get_kr_status(current_value, start_value, target_value) {
              let current_kr, status;
              current_kr = ((current_value - start_value) / (target_value - start_value)) * 100;
              current_kr = Math.round(current_kr);
              status = await get_status(current_kr, expected_kr);
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

          async function get_objective_status(data) {
              let cur_obj, new_data, status;
              new_data = [];
              let kr_data=[]
              for (let j=0; j<data.length; j++){
                  let data1 = await get_kr_status(data[j].currentValue, data[j].start, data[j].target);
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
              status = await get_status(cur_obj, expected_kr);
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

          async function get_overall_status(data) {
              let cur_overall, new_data, status;
              let OBJ_ARRAY = [];
              new_data = [];
              let parentOkrData;
              for (let i = 0; i<data.length; i++) {
                  let obj_data = await get_objective_status(data[i].krs);
                  let okrWhichParentToMe = await Okr.find({ parent: data[i]._id });
                  if (okrWhichParentToMe){
                    parentOkrData = await get_overall_status(okrWhichParentToMe);
                  }
                  let POST_DATA = {
                      parentOkr: JSON.parse(parentOkrData).okrs ? JSON.parse(parentOkrData).okrs : [],
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
                  }
                  OBJ_ARRAY.push(POST_DATA);

                  new_data.push(obj_data[0]);
                  total_okr = total_okr + 1;
              }
              cur_overall = sum(new_data) / new_data.length;
              cur_overall = Math.round(cur_overall);
              status = await get_status(cur_overall, expected_kr);
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

          const newData = await get_overall_status(okrData);
          let res1 = JSON.parse(newData);
          customLogger.log('info', `Success with okr's data`);
          return res1;

      }
      else if (okrData.length === 0){
        customLogger.log('info', `Success with no okr's`);
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
    customLogger.log('info', `Error - ${error}`);
  }
}

module.exports = { 
  customResponse, 
  customPagination, 
  signToken, 
  getRefreshToken, 
  initial, 
  getMonthNo, 
  getAvatarUrl,
  getStatsOfOkr,
  getStatsOfOkrWithoutOkrList,
};
