const sanitizer = require("sanitize")();
const User = require("../modules/user/model");
const { HTTP_CODES } = require('../utility/constants');
const { customResponse } = require("../utility/helper");

/**
 * Check whether the Username or Email Already Exist or not.
 */
verifyEmail =  async (req, res, next) => {
    const email = sanitizer.value(req.body.email, 'email');
    const userEmailExist = await User.findOne({
      email: email
    }).count();
    
    if(userEmailExist === 0) {
      next();
    }
    else{
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST, 
        message: "Failed! Email is already in use!", 
        err: {} 
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
};
  const verifyUserSignUp = {
    verifyEmail,
  };
  
  module.exports = verifyUserSignUp;