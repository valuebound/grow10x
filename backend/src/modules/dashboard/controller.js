const Okr = require("../okr/model");
const User = require("../user/model");
const { customResponse } = require("../../utility/helper");
const { HTTP_CODES, OKR_TYPES } = require("../../utility/constants");
const timePeriod = require("../timeperiod/model");
const { customLogger } = require("../../utility/logger");
const sanitizer = require("sanitize")();
const { getStatsOfOkrWithoutOkrList } = require("../../utility/helper");


/**
 * get Dashboard Stats Of Indivdual type OKR of loggedin user
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getDashboardData = async (req, res) => {
  try{
    const userId = req.userId;
    const getOrgFromUserData = await User.findById(userId, { _id:0,organization:1});
    const orgId = req?.query?.orgid ? req.query.orgid : getOrgFromUserData.organization;
    const quarter = sanitizer.value(req.query.quarter, 'str');
    const getQuarterData = await timePeriod.findOne({
      _id: quarter,
      organization: orgId,
      isDeleted: false,
    },
    {
      _id:1,
      name:1,
      startDate:1,
      endDate:1
    });
    let currentQuarter = getQuarterData?._id ? getQuarterData._id : null;
    if (!getQuarterData){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: `Time Period Doesn't Exist`,
        data: {}
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    if(getQuarterData){
      const getOkrData = await Okr.find({ owner: userId, isDeleted: false ,
        quarter: getQuarterData._id, type: OKR_TYPES.INDIVIDUAL })

      const statsData = await getStatsOfOkrWithoutOkrList(getOkrData, currentQuarter, orgId);
      const resData = customResponse({
        code: HTTP_CODES.SUCCESS,
        message: `Dashboard Summary Fetched Successfully`,
        data: statsData
      });
      customLogger.log('info', 'Dashboard Summary Fetched Successfully!!');
      return res.status(HTTP_CODES.SUCCESS).send(resData);
    }
  } catch (error) {
    customLogger.log('error', error.message);
    if (error.kind === 'ObjectId'){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "Invalid Quarter id Provided",
        err: {},
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: `Time Period Doesn't Exist`,
      data: {}
    });
    customLogger.log('info', 'Dashboard Summary Failed!!');
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
};

const getDashboardDataCompanyWide = async (req, res) => {
  try{
    const userId = req.userId;
    const getOrgFromUserData = await User.findById(userId, { _id:0,organization:1});
    const orgId = req?.query?.orgid ? req.query.orgid :getOrgFromUserData.organization;
    const quarter = sanitizer.value(req.query.quarter, 'str');
    const getQuarterData = await timePeriod.findOne({
      _id: quarter,
      organization: orgId,
      isDeleted: false,
    },
    {
      _id:1,
      name:1,
      startDate:1,
      endDate:1
    });
    if (!getQuarterData){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: `Time Period Doesn't Exist`,
        data: {}
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    if(getQuarterData){
      const getOkrData = await Okr.find({ isDeleted: false , quarter: getQuarterData._id, type: OKR_TYPES.COMPANY })
      .populate("owner",{organization:1});
      let myCompanyOKR=[]
      for(let i = 0; i<getOkrData.length; i++){
        if (String(getOkrData[i].owner.organization) === String(orgId) ){
          if (getOkrData[i].krs.length > 0) {
            myCompanyOKR.push(getOkrData[i]);
          }
        }
      }
      const statsData = await getStatsOfOkrWithoutOkrList(myCompanyOKR, getQuarterData._id, orgId);

      const resData = customResponse({
        code: HTTP_CODES.SUCCESS,
        message: `Company Dashboard Summary Fetched Successfully`,
        data: statsData
      });
      return res.status(HTTP_CODES.SUCCESS).send(resData);
      }

  } catch (error) {
    customLogger.log('error', error.message);
    if (error.kind === 'ObjectId'){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "Invalid Quarter id Provided",
        err: {},
      });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: `Time Period Doesn't Exist`,
      data: {}
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
};

module.exports = { getDashboardData, getDashboardDataCompanyWide };
