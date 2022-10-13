const sanitizer = require("sanitize")();
const timePeriod = require("../modules/timeperiod/model");
const User = require("../modules/user/model");
const { HTTP_CODES } = require('../utility/constants');
const { customResponse } = require("../utility/helper");

/**
 * Check whether the TeamName is Already Exist or not.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.verifytimePeriod = async function verifytimePeriod (req, res, next) {
    
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    
    const _id = req.userId;
    const user = await User.findById(_id);
    const orgId = user.organization;
    if (startDate && endDate){
        const timePeriodExist = await timePeriod.findOne({
            startDate: startDate,
            endDate: endDate,
            organization: orgId ,
            isDeleted: false,
        }).count();
        
        if (timePeriodExist === 0){
            next();
        }
        else{
            const resData = customResponse({
                code: HTTP_CODES.BAD_REQUEST, 
                message: "Time Period Already Exist!", 
                err: {} 
            });
            return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
        }
    }
    else {
        const resData = customResponse({
                code: HTTP_CODES.BAD_REQUEST, 
                message: "Failed! Start or End Date is Empty!", 
                err: {} 
            });
            return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
};
