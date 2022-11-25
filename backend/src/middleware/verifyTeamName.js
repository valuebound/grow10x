const sanitizer = require("sanitize")();
const Team = require("../modules/team/model");
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
module.exports.verifyTeamName = async function verifyTeamName (req, res, next) {
    const teamName = sanitizer.value(req.body.teamName, 'str');
    
    const _id = req.userId;
    const user = await User.findById(_id);
    const orgId = req?.query?.orgid ? req?.query?.orgid : user.organization;
    if (teamName){
        const teamNameExist = await Team.findOne({
            teamName: new RegExp("^" + teamName + "$", 'i'),
            organization: orgId ,
        }).count();
        
        if (teamNameExist === 0){
            next();
        }
        else{
            const resData = customResponse({
                code: HTTP_CODES.BAD_REQUEST, 
                message: "Failed! Team Name is already in use!", 
                err: {} 
            });
            return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
        }
    }
    else {
        const resData = customResponse({
                code: HTTP_CODES.BAD_REQUEST, 
                message: "Failed! Team Name is Empty!", 
                err: {} 
            });
            return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
};
