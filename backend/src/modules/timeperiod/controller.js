const timePeriodModel = require("./model");
const User = require("../user/model");
const { HTTP_CODES, ERROR_MESSAGES, ROLES } = require("../../utility/constants");
const { customResponse } = require("../../utility/helper");
const { addTimePeriodSchema } = require("./schema");
const logger = require("../../utility/logger");
const userType = require("../userType/model");
const sanitizer = require("sanitize")();

const createTimePeriod = async (req, res) => {
  try {
    const _id = req.userId;
    const user = await User.findById(_id);
    const orgId = user.organization;
    /**
     * Joi Validation
     */
    const { error } = addTimePeriodSchema.validate(req.body);
    if (error) {
      const resData = customResponse({
         code: HTTP_CODES.UNPROCESSABLE_ENTITY,
         message: error.message,
         err: {},
      });
      return res.status(HTTP_CODES.UNPROCESSABLE_ENTITY).send(resData);
    }
    const newTimePeriod = await timePeriodModel({
      name: `${req.body.name} (${req?.body?.startDate} - ${req?.body?.endDate})`,
      organization: orgId,
      startDate: req?.body?.startDate,
      endDate: req?.body?.endDate,
      isCurrent: req?.body?.isCurrent,
      createdBy: _id,
    });
    newTimePeriod.save();
    /**
     * Mark other time period as non-current.
     */
    if (newTimePeriod?.isCurrent === true){
      const getCurrentTimeperiod = await timePeriodModel.find({ organization: orgId, isCurrent: true, isDeleted: false });
      if (getCurrentTimeperiod.length > 0){
        for (let i = 0; i < getCurrentTimeperiod.length; i++){
          if ( String(getCurrentTimeperiod[i]._id) !== String(newTimePeriod._id)){
            const updateTimePeriod = await timePeriodModel.findByIdAndUpdate(getCurrentTimeperiod[i]._id, { isCurrent: false }, { new: true });
          }
        }
      }
    }
    const resData = customResponse({
      code: HTTP_CODES.CREATED,
      message: `${newTimePeriod.name} created successfully`,
      data: newTimePeriod
    });
    return res.status(HTTP_CODES.CREATED).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({
      code:HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      err: {}
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

const updateTimePeriod = async (req, res) => {
  try {
    const userid = req.userId;
    const user = await User.findById(userid);
    const orgId = user.organization;
    const _id = sanitizer.value(req.params.timeperiodid, 'str');
    const mongoResult = await timePeriodModel.findById(_id);
    if (mongoResult.isDeleted === true){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: `${mongoResult.name} is aleady Deleted.`,
        err: {}
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    else{
      const updateTimePeriodData = await timePeriodModel.findByIdAndUpdate(
      {
        _id
      },
      {
        name: req?.body?.name,
        startDate: req?.body?.startDate,
        endDate: req?.body?.endDate,
        isCurrent: req?.body?.isCurrent,
        isLocked: req?.body?.isLocked,
        isDeleted: req?.body?.isDeleted,
      },
      {
        new: true
      });
      /**
       * Mark other time period as non-current.
       */
      if (updateTimePeriodData.isCurrent === true){
        const getCurrentTimeperiod = await timePeriodModel.find({ organization: orgId, isCurrent: true, isDeleted: false });
        if (getCurrentTimeperiod.length > 0){
          for (let i = 0; i < getCurrentTimeperiod.length; i++){
            if ( String(getCurrentTimeperiod[i]._id) !== String(updateTimePeriodData._id)){
              const updateTimePeriod = await timePeriodModel.findByIdAndUpdate(getCurrentTimeperiod[i]._id, { isCurrent: false }, { new: true });
            }
          }
        }
      }
      const resData = customResponse({
        code: HTTP_CODES.SUCCESS,
        message: `${updateTimePeriodData.name} is Updated Successfully.`,
        data: updateTimePeriodData
      });
      return res.status(HTTP_CODES.SUCCESS).send(resData);
    }
  } catch (error) {
    logger.customLogger.log('error', error)
    if (error.kind === 'ObjectId'){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "Invalid timeperiod id Provided",
        err: {},
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: `Failed to Update Time Period`,
      err: {}
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
};

const deleteTimePeriod = async (req, res) => {
    try {
      const _id = sanitizer.value(req.params.timeperiodid, 'str');
      const mongoResult = await timePeriodModel.findById(_id);
      if (mongoResult.isDeleted === true){
        const resData = customResponse({
            code: HTTP_CODES.BAD_REQUEST,
            message: `${mongoResult.name} is already Deleted.`,
            err: {}
        });
        return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
      }
      else{
        const markDelete = await timePeriodModel.findByIdAndUpdate(
        {
            _id
        },
        {
            isDeleted: true,
        },
        {
            new: true
        });
        const resData = customResponse({
            code: HTTP_CODES.SUCCESS,
            message: `${markDelete.name} is Deleted Successfully.`,
            data: {}
        });
        return res.status(HTTP_CODES.SUCCESS).send(resData);
      }
    } catch (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({
    code: HTTP_CODES.BAD_REQUEST,
    message: `Failed to Delete Time Period`,
    err: {}
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
};

const getAllTimePeriod = async (req, res) => {
  try {
    const _id = req.userId;
    const user = await User.findById(_id);
    const orgId = user.organization;

    const mongoResult = await timePeriodModel.find({ organization:orgId ,isDeleted:false},{__v:0})
      .populate("createdBy",{firstName:1, surname:1})

    if (mongoResult.length === 0){
      const resData = customResponse({
        code: HTTP_CODES.SUCCESS,
        message: `No time period is found, please contact your org Admin.`,
        data: [],
      });
      return res.status(HTTP_CODES.SUCCESS).send(resData);
    }
    else {
      const resData = customResponse({
        code: HTTP_CODES.SUCCESS,
        message: `Time Period List is Fetched Successfully.`,
        data: mongoResult ,
      });
      return res.status(HTTP_CODES.SUCCESS).send(resData);
    }
  } catch (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({
    code: HTTP_CODES.BAD_REQUEST,
    message: `Failed to Fetch all Time Period`,
    err: {}
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
};



module.exports = { createTimePeriod, updateTimePeriod ,deleteTimePeriod ,getAllTimePeriod};
