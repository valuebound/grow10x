const { timePeriod, activityFeed } = require("../../models");
const Okr = require("./model");
const { HTTP_CODES, ERROR_MESSAGES, ACTIVITY_STATUS, OKR_TYPES, UNIT_TYPES, KR_OPERATIONS } = require("../../utility/constants");
const { customResponse } = require("../../utility/helper");
const moment = require('moment');
const User = require("../../modules/user/model");
const { createOkrSchema } = require("./schema");
const logger = require('../../utility/logger');
const sanitizer = require("sanitize")();
const {sum} = require('mathjs');
const Checkin = require("../../models/checkin.model");

const createOkr = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    const orgID = user.organization;
    const currentTimePeriod = sanitizer.value(req.body.quarter, 'str');
    if (!currentTimePeriod || currentTimePeriod === '' || currentTimePeriod === null){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: `Time Period Not Provided`,
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const getCurrentQuarter = await timePeriod.findById(
      currentTimePeriod,
      {
        _id:1,
        name:1,
        isCurrent:1,
        isLocked:1,
        isDeleted:1,
      }
    ).sort({ timestamp:-1 });
    if (getCurrentQuarter?.isDeleted === true){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: `${getCurrentQuarter.name} is Deleted.`,
        data: {}
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    else if (getCurrentQuarter?.isLocked === true){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: `${getCurrentQuarter.name} is Locked.`,
        data: {}
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    else if (!getCurrentQuarter){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: `No time period is found, please contact your org Admin.`,
        data: {}
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    /**
     * Joi Validation
     */
    const { error } = createOkrSchema.validate(req.body);
    if (error) {
      const resData = customResponse({
        code: HTTP_CODES.UNPROCESSABLE_ENTITY,
        message: `Validation Failed! Invalid request data ${error.message}`,
        err: {},
      });
      return res.status(HTTP_CODES.UNPROCESSABLE_ENTITY).send(resData);
    }
    let krsBody = req.body.krs;
    for (let i =0; i< krsBody.length ; i++){
      if (krsBody[i].isBoolean === true || krsBody[i].unit === UNIT_TYPES.BOOLEAN){
        let newkrs = {
          start : 0,
          target: 100,
          currentValue: 0,
          keyResult: krsBody[i].keyResult,
          isBoolean: krsBody[i].isBoolean,
          unit: krsBody[i].unit,
          comment: krsBody[i].comment,
        }
        krsBody[i] = newkrs;
      }
      else if (krsBody[i].unit === UNIT_TYPES.PERCENTAGE || krsBody[i].unit === UNIT_TYPES.NUMBER){
        /**
         * Validating OKR start and target before saving into db
         */
        if (krsBody[i].start >= 0 && krsBody[i].start < krsBody[i].target){
          let newkrs = {
            start : krsBody[i].start,
            target: krsBody[i].target,
            currentValue: krsBody[i].start,
            keyResult: krsBody[i].keyResult,
            isBoolean: krsBody[i].isBoolean,
            unit: krsBody[i].unit,
            comment: krsBody[i].comment,
          }
          krsBody[i] = newkrs;
        }
        else if (krsBody[i].start >= 0 && krsBody[i].start > krsBody[i].target){
          logger.customLogger.log('error', `start value is greater than target`);
          const resData = customResponse({
            code: HTTP_CODES.BAD_REQUEST,
            message: `start value '${krsBody[i].start}' should not be greater than target value '${krsBody[i].target}'`,
            err: {}
          });
          return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
        }
        else if (krsBody[i].start >= 0 && krsBody[i].start === krsBody[i].target){
          const resData = customResponse({
            code: HTTP_CODES.BAD_REQUEST,
            message: `start value '${krsBody[i].start}' should not be equal to target value '${krsBody[i].target}'`,
            err: {}
          });
          return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
        }
        else {
          const resData = customResponse({
            code: HTTP_CODES.BAD_REQUEST,
            message: `Invalid Request Data'`,
            err: {}
          });
          return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
        }
      }
    }

    const okr = await Okr({
      owner: userId,
      parent: req.body.parent,
      objective: req.body.objective,
      type: req.body.type,
      krs: krsBody,
      quarter: getCurrentQuarter._id,
    });
    okr.save();

    /**
    ****************************
     ACTIVITY FEED
    ****************************
     */
    let activityFeedData = {
      newData: okr,
      createdBy: userId,
      operation: KR_OPERATIONS.OKR_CREATED,
      timestamp: moment().format()
    }
    if (okr?._id){
      const createActivityFeed = await activityFeed({
        user: userId,
        id: okr._id,
        type: 'okr',
        status: ACTIVITY_STATUS.CREATED,
        activity: activityFeedData,
        createdAt: moment().format(),
      });
      createActivityFeed.save();
    }

    /**
     * Create Activity Feed for each KR
     */
    if (okr?.krs.length > 0 ){
      for (k =0 ; k <okr?.krs.length; k++){
        let activityFeedData = {
          newData: okr.krs[k],
          createdBy: userId,
          operation: KR_OPERATIONS.KR_CREATED,
          timestamp: moment().format()
        }
        const createActivityFeedKR = await activityFeed({
          user: userId,
          id: okr.krs[k]._id,
          type: 'kr',
          status: ACTIVITY_STATUS.CREATED,
          activity: activityFeedData,
          createdAt: moment().format(),
        });
        createActivityFeedKR.save();
      }
    }

    const resData = customResponse({
      code: HTTP_CODES.CREATED,
      message: 'OKR created successfully!',
      data: okr
    });
    return res.status(HTTP_CODES.CREATED).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({
      code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
      err: {}
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

const getMyAllOkrs = async (req, res) => {
  try {
    let okrResponseData = [];
    const userId = req.userId;
    const user = await User.findById(userId);
    const orgID = user.organization;
    const quarter = sanitizer.value(req.query.quarter, 'str');
    if (!quarter || quarter === ''){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: `Quarter Doesn't Exist`,
        err: {}
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const owner = sanitizer.value(req.query.owner, 'str');
    if (!owner || owner === ''){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: `Owner Doesn't Exist`,
        err: {}
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const type = sanitizer.value(req.query.type, 'str');
    let okr;
    if (!type || type === ''){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: `Type Doesn't Exist`,
        data: {}
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    if(type === OKR_TYPES.INDIVIDUAL){
      okr = await Okr.find({ owner: owner, type: type, isDeleted: false, quarter: quarter })
      .populate("owner", {
        _id: 1,
        firstName: 1,
        surname:1,
        manager: 1,
        organization:1,
        avatar:1,
      })
      .populate("parent", { _id: 1, firstName: 1,
        surname:1, })
      .populate("krs.comment.commentedBy", { _id: 1, firstName: 1,
        surname:1, avatar:1 });
      const statsData = await getStatsOfOkr(okr, quarter, orgID);
      const resData = customResponse({
        code: HTTP_CODES.SUCCESS,
        message: 'OKRs details',
        data: statsData
      });
      return res.status(HTTP_CODES.SUCCESS).send(resData);
    }
    else if (type === OKR_TYPES.COMPANY ){
      okr = await Okr.find({ type: type, isDeleted: false, quarter: quarter, })
      .populate("owner", {
        _id: 1,
        firstName: 1,
        surname:1,
        avatar: 1,
        manager: 1,
        organization: 1,
      })
      .populate("parent", { _id: 1, firstName: 1,
        surname:1, })
      .populate("krs.comment.commentedBy", { _id: 1, firstName: 1,
        surname:1, avatar:1});
      if( okr.length > 0){
        for (let i = 0; i< okr.length; i++){
          if (String(orgID) === String(okr[i].owner.organization)){
            okrResponseData.push(okr[i]);
          }
        }
      }
      const finalData = await getStatsOfOkr(okrResponseData, quarter, orgID);
      const resData = customResponse({
        code: HTTP_CODES.SUCCESS,
        message: 'OKRs details',
        data: finalData
      });
      return res.status(HTTP_CODES.SUCCESS).send(resData);
    }
    else{
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: `Invalid Type Provided`,
        err: {}
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
  } catch (error) {
    logger.customLogger.log('error', error);
    if (error.path === 'owner' && error.kind === 'ObjectId'){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: `Invalid ${error.path} id provided`,
        err: {},
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    else if (error.path === 'quarter' && error.kind === 'ObjectId'){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: `Invalid ${error.path} id provided`,
        err: {},
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const resData = customResponse({
      code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
      err: {}
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

/**
 * Update Self OKR Only
 * @param {*} req
 * @param {*} res
 * @returns
 */
const updateOkr = async (req, res) => {
  try {
    const _id = sanitizer.value(req.params.okrid, 'str');
    const userId = req.userId;
    const user = await User.findById(userId);
    const orgID = user.organization;
    const checkOkrExist = await Okr.findOne({_id: _id, owner: userId, isDeleted:false }).count();
    const checkOKRQuarter = await Okr.findOne({_id: _id, owner: userId, isDeleted:false }).populate('quarter', {isLocked:1});
    if (checkOKRQuarter.quarter.isLocked === true){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: 'Quarter Locked You Cannot Update it!',
        data: {}
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    if (checkOkrExist == 0){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: 'OKR Already Deleted You Cant Update it!',
        data: {}
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const okr = await Okr.findByIdAndUpdate(
      {
        _id,
        owner: userId
      },
      {
        parent: req?.body?.parent,
        objective: req?.body?.objective,
        type: req?.body?.type,
        krs: req?.body?.krs,
        quarter: req?.body?.quarter,
        updatedAt: moment().format(),
      },
      {
        new:true
      }
    );

    const findActivityFeedId = await activityFeed.findOne({objective: _id},{_id:1});
    let activityFeedData = {
      prevData: checkOKRQuarter,
      newData: okr,
      createdBy: userId,
      operation: KR_OPERATIONS.OKR_UPDATED,
      timestamp: moment().format()
      }

    if (okr._id){
      const updateActivityFeed = await activityFeed.findByIdAndUpdate(findActivityFeedId,
        {
          status: ACTIVITY_STATUS.UPDATED,
        $push: {
          activity :activityFeedData,
        }
      });
    }
    /**
     * Checking Kr Activity Feed is present or not.
     */
    for (let i=0; i<okr.krs.length; i++){
      const doesExist = await activityFeed.findOne({ id: okr.krs[i]._id }).count();
      if (doesExist === 0 ){
        let activityFeedData = {
          newData: okr.krs[i],
          createdBy: userId,
          operation: KR_OPERATIONS.KR_CREATED,
        };
        const createActivityFeedKR = await activityFeed(
          {
          user: userId,
          id: okr.krs[i]._id,
          type: 'kr',
          status: ACTIVITY_STATUS.CREATED,
          activity: activityFeedData,
          createdAt: moment().format(),
        });
        createActivityFeedKR.save();
      }
    }
    /**
     * Checking Each Kr
     */

    for (let i =0, j=0; i <checkOKRQuarter.krs.length, j< okr.krs.length; i++, j++){
      let oldDataArray = [];
      let newDataArray =[];
      let tempData = {} ;
      let newTempData = {};
      if ( String(checkOKRQuarter.krs[i]?._id) === String(okr.krs[j]?._id)){
        if (checkOKRQuarter.krs[i].keyResult !== okr.krs[j].keyResult){
          tempData.keyResult = checkOKRQuarter.krs[i].keyResult;
          newTempData.keyResult = okr.krs[j].keyResult;
        }
        if (checkOKRQuarter.krs[i].start !== okr.krs[j].start){
          tempData.start = checkOKRQuarter.krs[i].start
          newTempData.start = okr.krs[j].start
        }
        if (checkOKRQuarter.krs[i].target !== okr.krs[j].target){
          tempData.target = checkOKRQuarter.krs[i].target
          newTempData.target = okr.krs[j].target
        }
        if (checkOKRQuarter.krs[i].unit !== okr.krs[j].unit){
          tempData.unit = checkOKRQuarter.krs[i].unit
          newTempData.unit = okr.krs[j].unit
        }
        if (checkOKRQuarter.krs[i].currentValue !== okr.krs[j].currentValue){
          tempData.currentValue = checkOKRQuarter.krs[i].currentValue
          newTempData.currentValue = okr.krs[j].currentValue
        }
        oldDataArray.push(tempData);
        newDataArray.push(newTempData);

        if (Object.keys(oldDataArray[0]).length !== 0 && Object.keys(newDataArray[0]).length !== 0){
          let activityFeedData = {
            prevData: oldDataArray[0],
            newData: newDataArray[0],
            createdBy:  userId,
            operation: KR_OPERATIONS.KR_UPDATED,
            timestamp: moment().format(),
            }
          const updateActivityFeedKr = await activityFeed.findOneAndUpdate({id: okr.krs[j]._id},
            { status: ACTIVITY_STATUS.UPDATED,
              $push:{
              activity: activityFeedData,}
            }
          )
        }
      }
    }
    /**
     * Update Current Quarter Checkin if Quarter is diff
     */
    if (String(checkOKRQuarter.quarter._id) !== String(okr.quarter)){
      /**
       * Update current quarter
       */
      const getCurrentQuarter = await timePeriod.findOne({ organization: orgID, isCurrent: true, isDeleted: false, isLocked: false}, {_id:1});
      if (getCurrentQuarter?._id){
        await updateCheckin(userId, String(getCurrentQuarter._id), orgID);
      }
    }
    /**
     * Updated OKR quarter data
     */
    await updateCheckin(userId, String(okr.quarter), orgID);

    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: 'OKR Updated Successfully!',
      data: okr
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error);
    if (error.kind === 'ObjectId'){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "Invalid okr id Provided",
        err: {},
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const resData = customResponse({
      code : HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
      err: {}
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

const addNewKrs = async (req, res) => {
  try {
    const okrId = sanitizer.value(req.params.okrid, 'str');
    const userId = req.userId;
    const checkOKRQuarter = await Okr.findOne({_id: okrId, owner: userId }).populate('quarter', {isLocked:1});
    if (checkOKRQuarter.quarter.isLocked === true){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: 'Quarter Locked You Cannot Update it!',
        data: {}
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    let krsBody = req.body.krs;
    for (let i =0; i< krsBody.length ; i++){
      if (krsBody[i].isBoolean === true || krsBody[i].unit === UNIT_TYPES.BOOLEAN){
        let newkrs = {
          start : 0,
          target: 100,
          currentValue: 0,
          keyResult: krsBody[i].keyResult,
          isBoolean: krsBody[i].isBoolean,
          comment: krsBody[i].comment,
        }
        krsBody[i] = newkrs;
      }
      else if (krsBody[i].unit === UNIT_TYPES.PERCENTAGE || krsBody[i].unit === UNIT_TYPES.NUMBER){
        /**
         * Validating OKR start and target before saving into db
         */
        if (krsBody[i].start >= 0 && krsBody[i].start < krsBody[i].target){
          let newkrs = {
            start : krsBody[i].start,
            target: krsBody[i].target,
            currentValue: krsBody[i].start,
            keyResult: krsBody[i].keyResult,
            isBoolean: krsBody[i].isBoolean,
            unit: krsBody[i].unit,
            comment: krsBody[i].comment,
          }
          krsBody[i] = newkrs;
        }
        else if (krsBody[i].start >= 0 && krsBody[i].start > krsBody[i].target){
          logger.customLogger.log('error', `start value is greater than target`);
          const resData = customResponse({
            code: HTTP_CODES.BAD_REQUEST,
            message: `start value '${krsBody[i].start}' should not be greater than target value '${krsBody[i].target}'`,
            err: {}
          });
          return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
        }
        else if (krsBody[i].start >= 0 && krsBody[i].start === krsBody[i].target){
          const resData = customResponse({
            code: HTTP_CODES.BAD_REQUEST,
            message: `start value '${krsBody[i].start}' should not be equal to target value '${krsBody[i].target}'`,
            err: {}
          });
          return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
        }
        else {
          const resData = customResponse({
            code: HTTP_CODES.BAD_REQUEST,
            message: `Invalid Request Data'`,
            err: {}
          });
          return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
        }
      }
    }
    const addKrs = await Okr.findOneAndUpdate(
      {
        _id: okrId,
        owner: userId
      },
      {
        $push: {
          krs: krsBody
        },
        updatedAt: moment().format(),
      },
      {
        new:true
      }
    );

    const findActivityFeedId = await activityFeed.findOne({id: okrId},{_id:1});
    let activityFeedData = {
      newData: addKrs,
      createdBy: userId,
      }

    if (addKrs._id){
      const updateActivityFeed = await activityFeed.findByIdAndUpdate(findActivityFeedId,
        {
          status: ACTIVITY_STATUS.UPDATED,
        $push: {
          activity :activityFeedData,
        }
      });
    }
    /**
     * Create Activity Feed for each KR
     */
     if (addKrs){
      for (k =0 ; k <krsBody.length; k++){
        let activityFeedData = {
          newData: krsBody[k],
          createdBy: userId,
          operation: KR_OPERATIONS.KR_CREATED,
          timestamp: moment().format(),
        };
        const createActivityFeedKR = await activityFeed({
          user: userId,
          id: krsBody[k]._id,
          type: 'kr',
          status: ACTIVITY_STATUS.CREATED,
          activity: activityFeedData,
          createdAt: moment().format(),
        });
        createActivityFeedKR.save();
      }
    }

    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: 'Added KRS Successfully!',
      data: addKrs
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);

  } catch (error) {
    logger.customLogger.log('error', error);
    if (error.kind === 'ObjectId'){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "Invalid okr id Provided",
        err: {},
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const resData = customResponse({
      code : HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
      err: {}
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

const deleteOKR = async (req, res) => {
  try {
    const okrId = sanitizer.value(req.params.okrid, 'str');
    const userId = req.userId;
    const user = await User.findById(userId);
    const orgID = user.organization;
    const checkOKRQuarter = await Okr.findOne({_id: okrId, owner: userId }).populate('quarter', {_id:1, isLocked:1});
    if (checkOKRQuarter.quarter.isLocked === true){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: 'Quarter Locked You Cannot Delete it!',
        data: {}
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const deletedOkr = await Okr.findByIdAndDelete(okrId);
    /**
     * Deleting Activity Feed for OKR
     */
    const findActivityFeedId = await activityFeed.findOneAndDelete({id: okrId});
    if (deletedOkr._id){
      /**
       * Delete its Respective KR Activity Feed.
       */
      for (let i = 0; i < deletedOkr.krs.length; i++){
        const deleteEachKRActivity = await activityFeed.findOneAndDelete({ id: deletedOkr.krs[i]._id });
      }
    }

    /**
     * Handle Checkin Data if Delete Case of Okr
     */
    if (deletedOkr?._id){
      if (deletedOkr?.type === OKR_TYPES.INDIVIDUAL){
        await updateCheckin(userId, checkOKRQuarter.quarter._id, orgID);
      }
      else if (deletedOkr?.type === OKR_TYPES.COMPANY){
        await updateCheckinCompanyOKR(userId, checkOKRQuarter.quarter._id, orgID,);
      }
    }


    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: `${deletedOkr.objective} Objective is deleted`,
      data: deletedOkr
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);

  } catch (error) {
    logger.customLogger.log('error', error);
    if (error.kind === 'ObjectId'){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "Invalid okr id Provided",
        err: {},
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const resData = customResponse({
      code : HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
      err: {}
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};


const deleteKr = async (req, res) => {
  try {
    const okrId = sanitizer.value(req.params.okrid, 'str');
    const userId = req.userId;
    const krsId = sanitizer.value(req.params.krsid, 'str');
    const checkOKRQuarter = await Okr.findOne({_id: okrId, owner: userId }).populate('quarter', {isLocked:1});
    if (checkOKRQuarter.quarter.isLocked === true){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: 'Quarter Locked You Cannot Delete it!',
        data: {}
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const deleteKr = await Okr.findByIdAndUpdate(
      {
        _id: okrId,
        owner: userId,
      },
      {
        $pull: {
          krs:{_id: krsId}  },
          updatedAt: moment().format(),
      },
      {
        new: true,
      });
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: `key result is deleted`,
      data: deleteKr
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);

  } catch (error) {
    logger.customLogger.log('error', error);
    if (error.kind === 'ObjectId'){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "Invalid okr/krs id Provided",
        err: {},
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const resData = customResponse({
      code : HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
      err: {}
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

const getSingleOKr = async (req, res) => {
  try {
    const okrId = sanitizer.value(req.params.okrid, 'str');
    const userId = req.userId;
    const user = await User.findById(userId);
    const orgID = user.organization;
    const getOKrData = await Okr.find({ _id: okrId, isDeleted: false })
      .populate("owner",
      {
        _id: 1,
        firstName: 1,
        surname:1,
        manager: 1,
        projectLead: 1,
      })
      .populate("parent", { _id: 1, firstName: 1,
        surname:1, })
      .populate("krs.comment.commentedBy", { _id: 1, firstName: 1,
        surname:1, avatar:1,
      })
    ;
    const finalData = await getStatsOfOkr(getOKrData, getOKrData[0].quarter, orgID);
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: `Objective is successfully fetched`,
      data: finalData
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error);
    if (error.kind === 'ObjectId'){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "Invalid okr id Provided",
        err: {},
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const resData = customResponse({
      code : HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
      err: {}
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
}

const checkInAndAddComment = async (req, res) => {
  try {
    const krId = sanitizer.value(req.params.krid, 'str');
    const userId = req.userId;
    const user = await User.findById(userId);
    const orgID = user.organization;
    const body = req?.body?.comment;
    if (body){
      body.createdAt = moment().format();
    }
    const getOldKrData = await Okr.findOne({"krs._id": krId, }, {krs:1, quarter:1}).populate("krs.comment.commentedBy",
    {
      _id:1, firstName:1, surname:1, avatar:1
    });
    const addComment = await Okr.findOneAndUpdate(
      {
        "krs._id": krId,
      },
      {
        $push: {
          "krs.$.comment": body,
        },
        $set: {
          "krs.$.currentValue": req.body.currentValue,
        }
      },
      {
        new: true,
      }
      );
    let oldDataArray = [];
    let newDataArray = [];
    /**
     * Find CommentedBy User Details.
     */
    let getUserData;
    if(req?.body?.comment){
      const userid = req?.body?.comment?.commentedBy;
      getUserData = await User.findById(userid, {_id:1, firstName:1, surname:1, avatar:1});
    }
    let commentData = {
      commentedBy: getUserData,
      text: req?.body?.comment?.text,
    }
    for (let i =0, j=0; i <getOldKrData.krs.length, j< addComment.krs.length; i++, j++){
      if (String(getOldKrData.krs[i]._id) === String(krId) && String(addComment.krs[i]._id) === String(krId)){
        if (getOldKrData.krs[i].currentValue !== addComment.krs[i].currentValue){
          oldDataArray.push({ currentValue : getOldKrData.krs[i].currentValue})
          newDataArray.push({
            currentValue : addComment.krs[i].currentValue,
            comment: req?.body?.comment?.text,
          })
        }
      }
    }
    /**
     * Get Overall Stats of User OKR's
     */
    let statsData;
    if (addComment.type === OKR_TYPES.INDIVIDUAL){
      const userOkrData = await Okr.find({ owner: userId, type: OKR_TYPES.INDIVIDUAL, isDeleted: false, quarter: getOldKrData.quarter })
      .populate("owner", {
        _id: 1,
        firstName: 1,
        surname:1,
        level: 1,
        teams: 1,
        manager: 1,
        projectLead: 1,
        organization:1,
        avatar:1,
      })
      .populate("parent", { _id: 1, firstName: 1,
        surname:1, })
      .populate("krs.comment.commentedBy", { _id: 1, firstName: 1,
        surname:1, avatar:1 });
      statsData = await getStatsOfOkr(userOkrData, getOldKrData.quarter, orgID);
    }
    else if (addComment.type === OKR_TYPES.COMPANY){
      let companyOKrData =[];
      let allCompanyOKRs  = await Okr.find({ type: OKR_TYPES.COMPANY, isDeleted: false, quarter: getOldKrData.quarter })
      .populate("owner", {
        _id: 1,
        firstName: 1,
        surname:1,
        level: 1,
        teams: 1,
        manager: 1,
        projectLead: 1,
        organization:1,
        avatar:1,
      })
      .populate("parent", { _id: 1, firstName: 1,
        surname:1, })
      .populate("krs.comment.commentedBy", { _id: 1, firstName: 1,
        surname:1, avatar:1 });
      if( allCompanyOKRs.length > 0){
        for (let i = 0; i< allCompanyOKRs.length; i++){
          if (String(orgID) === String(allCompanyOKRs[i].owner.organization)){
            companyOKrData.push(allCompanyOKRs[i]);
          }
        }
      }
      statsData = await getStatsOfOkr(companyOKrData, getOldKrData.quarter, orgID);
    }
    const checkinDate = moment().format('YYYY-MM-DD');

    const checkinData = {
      checkinDate: checkinDate,
      progress: statsData.overallProgress,
    }
    /**
     * Update Checkin
     */
    if (addComment.type === OKR_TYPES.INDIVIDUAL){
      const updateCheckinData = await Checkin.find({user: userId, quarter: getOldKrData.quarter,"checkin.checkinDate" : checkinDate,});

      if (updateCheckinData.length === 0){
        const updateCheckinDB = await Checkin.findOneAndUpdate(
          {
            user: userId,
            quarter: getOldKrData.quarter,
          },
          {
            $push: {
              checkin: checkinData,
            }
          },
          {
            upsert: true
          }
        );
      }
      else{
      for( let i = 0; i<updateCheckinData[0].checkin.length; i++){
        if (updateCheckinData[0].checkin[i].checkinDate === checkinDate){
          const updateCheckin = await Checkin.findOneAndUpdate(
            {
              user: userId,
              quarter: getOldKrData.quarter,
              "checkin._id" : updateCheckinData[0].checkin[i]._id,
            },
            {
              $set: {
                "checkin.$.progress": checkinData.progress,
              }
            },
            {
              new: true
            }
          );
        }
      }
    }
    }
    else if (addComment.type === OKR_TYPES.COMPANY){

      const updateCheckinData = await Checkin.find({ org: orgID, quarter: getOldKrData.quarter,"checkin.checkinDate" : checkinDate,});
      if (updateCheckinData.length === 0){
        const updateCheckinDb = await Checkin.findOneAndUpdate(
          {
            org: orgID,
            quarter: getOldKrData.quarter,
          },
          {
            $push: {
              checkin: checkinData,
            }
          },
          {
            upsert: true
          }
        );
      }
      else{
        for( let i = 0; i<updateCheckinData[0].checkin.length; i++){
          if (updateCheckinData[0].checkin[i].checkinDate === checkinDate){
            const updateCheckinDB = await Checkin.findOneAndUpdate(
              {
                org: orgID,
                quarter: getOldKrData.quarter,
                "checkin._id" : updateCheckinData[0].checkin[i]._id,
              },
              {
                $set: {
                  "checkin.$.progress": checkinData.progress,
                }
              },
              {
                new: true
              }
            );
          }
        }
      }
    }
    /**
     * Update activity Feed
     */
    let activityFeedData = {
      prevData: oldDataArray[0],
      newData: newDataArray[0],
      createdBy:  userId,
      operation: req?.body?.comment ? KR_OPERATIONS.KR_PROGRESS_UPDATED_COMMENTED : KR_OPERATIONS.KR_PROGRESS_UPDATED,
      timestamp: moment().format(),
      }
    const updateActivityFeedKr = await activityFeed.findOneAndUpdate({id: krId},
      { status: ACTIVITY_STATUS.UPDATED,
        $push:{
        activity: activityFeedData,}
      } )
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: `Checkin Done`,
      data: addComment
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error);
    if (error.kind === 'ObjectId'){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "Invalid okr id Provided",
        err: {},
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const resData = customResponse({
      code : HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
      err: {}
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
}

const updateComment = async (req, res) => {
  try {
    const krId = sanitizer.value(req.params.krid, 'str');
    const userId = req.userId;
    const getOldKrData = await Okr.findOne(
      {
        "krs._id": krId,
        "krs.comment._id": req.body.commentid,
        "krs.comment.commentedBy" : userId,
      });
    const updateComment = await Okr.findOneAndUpdate(
      {
        "krs._id": krId,
        "krs.comment._id": req.body.commentid,
        "krs.comment.commentedBy" : userId,
      },
      {
        "$set": {
          "krs.$.comment.$[id].text": req.body.text,
        },
      },
      {
        arrayFilters: [{ 'id._id': req.body.commentid }],
        new: true}
      );

    let oldDataArray = [];
    let newDataArray =[];
    for (let i =0, j=0; i <getOldKrData.krs.length, j< updateComment.krs.length; i++, j++){
      if (String(getOldKrData.krs[i]._id) === String(krId) && String(updateComment.krs[i]._id) === String(krId)){
        for (let k = 0; k< getOldKrData.krs[i].comment.length; k++){
          if (String(getOldKrData.krs[i].comment[k]._id) === String(req.body.commentid)){
            oldDataArray.push({ comment : getOldKrData.krs[i].comment[k].text})
            newDataArray.push({ comment : req.body.text})
          }
        }
      }
    }
      let activityFeedData = {
        prevData: oldDataArray[0],
        newData: newDataArray[0],
        createdBy: userId,
        operation: KR_OPERATIONS.COMMENT_UPDATED,
        timestamp: moment().format(),
      }
      const updateActivityFeedKr = await activityFeed.findOneAndUpdate({id: krId},
        { status: ACTIVITY_STATUS.UPDATED,
          $push:{
          activity: activityFeedData,}
        } )
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: `Comment Updated`,
      data: updateComment
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({
      code : HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
      err: {}
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
}

async function getStatsOfOkr(okrData, quarter, orgID){
  try{
    let total_okr = 0, total_krs = 0;
    let obj_status_done = 0,obj_status_onTrack= 0, obj_status_behind = 0, obj_status_atRisk = 0;
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
                overallProgress : cur_overall,
                overallStatus : status ? status : '',
                okrs : OBJ_ARRAY
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
          overallProgress : 0,
          overallStatus : "",
          okrs : []
        }
        return res;
      }

  }
  catch(error) {
    logger.customLogger.log('info', `Error - ${error}`);
  }
}

const addComment = async(req, res) => {
  try {
    const krId = sanitizer.value(req.params.krid, 'str');
    const userId = req.userId;
    const body = req?.body?.comment;
    console.log(body);
    if (!body || !body.text) {
      const resData = customResponse({ 
        code : HTTP_CODES.BAD_REQUEST, 
        message: `Please add comment`, 
        err: {} 
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);

    }
    if (body){
      body.createdAt = moment().format();
    }
    const addComment = await Okr.findOneAndUpdate(
      {
        "krs._id": krId,
      },
      {
        $push: {
          "krs.$.comment": body,
        }
      },
      {
        new: true,
      }
      );
    let oldDataArray = [];
    let newDataArray =[];
    let getUserData;
    if(req?.body?.comment){
      const userid = req?.body?.comment?.commentedBy;
      getUserData = await User.findById(userid, {_id:1, firstName:1, surname:1, avatar:1});
      let commentData = {
        commentedBy: getUserData,
        text: req?.body?.comment?.text,
      }
      newDataArray.push({ comment: req?.body?.comment?.text})
    }
    let activityFeedData = {
      prevData: oldDataArray[0],
      newData: newDataArray[0],
      createdBy: userId,
      operation: KR_OPERATIONS.COMMENTED,
      timestamp: moment().format(),
      }
    const updateActivityFeedKr = await activityFeed.findOneAndUpdate({id: krId},
      { status: ACTIVITY_STATUS.UPDATED,
        $push:{
        activity: activityFeedData,}
      } )
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: `Comment Added`,
      data: addComment
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({
      code : HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
      err: {}
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
}

const checkInSummary = async( req, res) => {
  try {
    const quarterId = sanitizer.value(req.query.quarter, 'str');

    if (!quarterId || quarterId === "" || quarterId === "undefined" ){
      const resData = customResponse({
        code : HTTP_CODES.BAD_REQUEST,
        message: `Time Period Doesn't Exist`,
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const userId = req.userId;
    const getcheckinSummary = await Checkin.findOne(
      {
        user: userId,
        quarter: quarterId,
      },
      {
        _id:1,
        checkin:1,
      }
    );
      /**
       * finalData[getcheckinSummary.checkin[i].checkinDate] = getcheckinSummary.checkin[i].progress;
       */
    let finalData = [];
    for (let i = 0; i < getcheckinSummary?.checkin?.length ; i++){
      let data = {
        key: 'actual',
        date: getcheckinSummary?.checkin[i]?.checkinDate,
        value: getcheckinSummary?.checkin[i]?.progress,
      }
      finalData.push(data);
    }
    const resData = customResponse({
      code : HTTP_CODES.SUCCESS,
      message: `Successfully Fetched Checkin Summary`,
      data: finalData
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({
      code : HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
      err: {}
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
}

const checkInCompanySummary = async( req, res) => {
  try {
    const quarterId = sanitizer.value(req.query.quarter, 'str');
    if (!quarterId || quarterId === "" || quarterId === "undefined" ){
      const resData = customResponse({
        code : HTTP_CODES.BAD_REQUEST,
        message: `Time Period Doesn't Exist`,
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const userId = req.userId;
    const user = await User.findById(userId);
    const orgID = user.organization;
    const getcheckinSummary = await Checkin.findOne(
      {
        org: orgID,
        quarter: quarterId,
      },
      {
        _id:1,
        checkin:1,
      }
    );
      /**
       * finalData[getcheckinSummary.checkin[i].checkinDate] = getcheckinSummary.checkin[i].progress;
       */
    let finalData = [];
    for (let i = 0; i < getcheckinSummary?.checkin.length ; i++){
      let data = {
        key: 'actual',
        date: getcheckinSummary?.checkin[i]?.checkinDate,
        value: getcheckinSummary?.checkin[i]?.progress,
      }
      finalData.push(data);
    }
    const resData = customResponse({
      code : HTTP_CODES.SUCCESS,
      message: `Successfully Fetched Checkin Summary`,
      data: finalData
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({
      code : HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
      err: {}
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
}

const updateCheckin = async (userId, quarterId, orgID) => {
  try {
     /**
     * Handle Checkin Data in Update Case of Okr
     */
      const getUserOkr = await Okr.find({ owner: userId, type: OKR_TYPES.INDIVIDUAL, isDeleted: false, quarter: quarterId});
      if (getUserOkr.length > 0){
        const statsData = await getStatsOfOkr(getUserOkr, quarterId, orgID);
        const checkinDate = moment().format('YYYY-MM-DD');

        const checkinData = {
        checkinDate: checkinDate,
        progress: statsData.overallProgress,
        }
        const updateCheckinData = await Checkin.find({user: userId, quarter: quarterId,"checkin.checkinDate" : checkinDate,});

        if (updateCheckinData.length === 0){
          const updateCheckin = await Checkin.findOneAndUpdate(
            {
              user: userId,
              quarter: quarterId,
            },
            {
              $push: {
                checkin: checkinData,
              }
            },
            {
              upsert: true
            }
          );
        }
        else{
          for( let i = 0; i<updateCheckinData[0].checkin.length; i++){
            if (updateCheckinData[0].checkin[i].checkinDate === checkinDate){
              const updateCheckin = await Checkin.findOneAndUpdate(
                {
                  user: userId,
                  quarter: quarterId,
                  "checkin._id" : updateCheckinData[0].checkin[i]._id,
                },
                {
                  $set: {
                    "checkin.$.progress": checkinData.progress,
                  }
                },
                {
                  new: true
                }
              );
            }
          }
        }
      }
      else if (getUserOkr.length === 0 ){
        const checkinDate = moment().format('YYYY-MM-DD');
        const updateCheckin = await Checkin.findOneAndUpdate(
          {
            user: userId,
            quarter: quarterId,
          },
          {
            $set: {
              checkin: {
                checkinDate: checkinDate,
                progress: 0 },
            }
          },
          {
            new: true
          }
        );
      }
  } catch (error) {
    logger.customLogger.log('error', error.stack);
  }
}

const updateCheckinCompanyOKR = async (userId, quarterId, orgID) => {
  try {
     /**
     * Handle Checkin Data in Update Case of Okr
     */
      const getOkrData = await Okr.find({ type: OKR_TYPES.COMPANY, isDeleted: false, quarter: quarterId })
      .populate("owner",{organization:1});
      let myCompanyOKR=[]
      for(let i = 0; i<getOkrData.length; i++){
        if (String(getOkrData[i].owner.organization) === String(orgID) ){
          if (getOkrData[i].krs.length > 0) {
            myCompanyOKR.push(getOkrData[i]);
          }
        }
      }
      if (myCompanyOKR.length > 0){
        const statsData = await getStatsOfOkr(myCompanyOKR, quarterId, orgID);
        const checkinDate = moment().format('YYYY-MM-DD');

        const checkinData = {
        checkinDate: checkinDate,
        progress: statsData.overallProgress,
        }
        const updateCheckinData = await Checkin.find({org: orgID, quarter: quarterId,"checkin.checkinDate" : checkinDate,});

        if (updateCheckinData.length === 0){
          const updateCheckin = await Checkin.findOneAndUpdate(
            {
              org: orgID,
              quarter: quarterId,
            },
            {
              $push: {
                checkin: checkinData,
              }
            },
            {
              upsert: true
            }
          );
        }
        else{
          for( let i = 0; i<updateCheckinData[0].checkin.length; i++){
            if (updateCheckinData[0].checkin[i].checkinDate === checkinDate){
              const updateCheckin = await Checkin.findOneAndUpdate(
                {
                  org: orgID,
                  quarter: quarterId,
                  "checkin._id" : updateCheckinData[0].checkin[i]._id,
                },
                {
                  $set: {
                    "checkin.$.progress": checkinData.progress,
                  }
                },
                {
                  new: true
                }
              );
            }
          }
        }
      }
      else if (myCompanyOKR.length === 0 ){
        const checkinDate = moment().format('YYYY-MM-DD');
        const updateCheckin = await Checkin.findOneAndUpdate(
          {
            org: orgID,
            quarter: quarterId,
          },
          {
            $set: {
              checkin: {
                checkinDate: checkinDate,
                progress: 0 },
            }
          },
          {
            new: true
          }
        );
      }
  } catch (error) {
    logger.customLogger.log('error', error.stack);
  }
}

module.exports = {
  createOkr,
  getMyAllOkrs,
  updateOkr,
  addNewKrs,
  deleteOKR,
  deleteKr,
  getSingleOKr,
  checkInAndAddComment,
  updateComment,
  getStatsOfOkr,
  addComment,
  checkInSummary,
  checkInCompanySummary,
};
