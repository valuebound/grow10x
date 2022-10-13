const jwt = require("jsonwebtoken");
const dbmodel = require('../models/index');
const User = require("../modules/user/model");
const userType = dbmodel.userType;
const { ROLES,PERMISSIONS } = require("../utility/constants");
const { customLogger } = require("./logger");
const { env } = require('../config/environment');
const config = require(`../config/${env}.config`);
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

module.exports = { customResponse, customPagination, signToken, getRefreshToken, initial, getMonthNo, getAvatarUrl};
