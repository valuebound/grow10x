const sanitizer = require("sanitize")();
const Org = require("../modules/organization/model");
const { HTTP_CODES } = require('../utility/constants');
const { customResponse } = require("../utility/helper");

/**
 * Check whether the Username or Email or Name or Phone Already Exist or not
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const verifyOrgName = async (req, res, next) => {
  const OrgName = sanitizer.value(req.body.orgName, 'str'); 
  if (OrgName){
    const orgNameExist = await Org.findOne({
      orgName: OrgName
    }).count();
    if (orgNameExist === 0){
      next();
    }
    else{
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST, 
        message: "Org Name already exist!", 
        err: {} 
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
  }
  else{
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST, 
      message: "Failed! Org Name field is empty!", 
      err: {} 
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
};

const verifyOrgEmail = async (req, res, next) => {
  const OrgEmail = sanitizer.value(req.body.adminEmail, 'email'); 
  if (OrgEmail){
    const orgEmailExist = await Org.findOne({
      adminEmail: OrgEmail
    }).count();
    if (orgEmailExist === 0){
      next();
    }
    else{
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST, 
        message: "Email already exist!", 
        err: {} 
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
  }
  else{
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST, 
      message: "Failed! Email field is empty!", 
      err: {} 
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
};

const verifyOrgUsername = async (req, res, next) => {
  const OrgUserName = sanitizer.value(req.body.orgUsername, 'str'); 
  if (OrgUserName){
    const orgUserNameExist = await Org.findOne({
      orgUsername: OrgUserName
    }).count();
    if (orgUserNameExist === 0){
      next();
    }
    else{
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST, 
        message: "Org UserName already exist!", 
        err: {} 
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
  }
  else{
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST, 
      message: "Failed! Org UserName field is empty!", 
      err: {} 
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
};

const verifyOrgPhone = async (req, res, next) => {
  const OrgPhone = sanitizer.value(req.body.adminPhone, 'int'); 
  if (OrgPhone){
    const orgPhoneExist = await Org.findOne({
      adminPhone: OrgPhone
    }).count();
    if (orgPhoneExist === 0){
      next();
    }
    else{
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST, 
        message: "Phone already exist!", 
        err: {} 
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
  }
  else{
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST, 
      message: "Failed! Org Phone field is empty!", 
      err: {} 
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
};

const verifyOrgSignUp = {
  verifyOrgName,
  verifyOrgEmail,
  verifyOrgPhone,
  verifyOrgUsername
};
  
module.exports = verifyOrgSignUp;
