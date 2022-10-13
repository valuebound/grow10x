const jwt = require("jsonwebtoken");
const db = require("../models");
const { customResponse } = require("../utility/helper");
const { HTTP_CODES, ROLES, ERROR_MESSAGES } = require("../utility/constants");
const Organization = require("../modules/organization/model");
const User = db.user;
const userType = db.userType;
const logger = require('../utility/logger');
const sanitizer = require('sanitize')();
const { env } = require('../config/environment');
const config = require(`../config/${env}.config`);

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    logger.customLogger.log('error', err);
    const resData = customResponse({
      code: HTTP_CODES.UNAUTHORIZED, 
      message: "Unauthorized! Access Token was expired!", 
      err: {} 
    });
    return res.status(HTTP_CODES.UNAUTHORIZED).send(resData);
  }
  const resData = customResponse({
    code: HTTP_CODES.UNAUTHORIZED, 
    message: "Unauthorized!", 
    err: {} 
  });
  return res.status(HTTP_CODES.UNAUTHORIZED).send(resData);
};

const verifyToken = (req, res, next) => {
  let token = sanitizer.value(req.headers["x-access-token"], 'str');

  if (!token) {
    const resData = customResponse({
      code: HTTP_CODES.FORBIDDEN, 
      message: "No Token Provided!",
    });
    return res.status(HTTP_CODES.FORBIDDEN).send(resData);
  }

  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.user_id;
    req.decode = decoded;
    req.token = token;
    next();
  });
};

const verifyOrg = async(req, res, next) => {
  try {
    let orgId = req.params.orgid;
    if (!orgId) {
      return res.status(HTTP_CODES.FORBIDDEN).send({ message: "No org Id provided!" });
    }
    const orgExist = await Organization.findById(orgId, {_id:1});
    if( !orgExist || orgExist.length === 0){
      return res.status(HTTP_CODES.FORBIDDEN).send({ message: "Invalid Organization.!!" });
    }
    const findUsersOrgId = await User.findById(req.userId,{ _id:0, organization:1 });
    if (String(findUsersOrgId.organization) === String(orgExist._id)){
      next();
    }
    else {
      return res.status(HTTP_CODES.FORBIDDEN).send({ message: "Organization Is not Same.!!" });
    }
  } catch (error) {
    return res.status(HTTP_CODES.FORBIDDEN).send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

/**
 * It checks for more than one time logout api call
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const verifyLogOut = async(req, res, next) => {
  try {
    const token = req.headers["x-access-token"]
    const user = await User.find({
      token: { $in: token},
    });
    if (!user || user.length === 0) {
      const resData = customResponse({
        code: HTTP_CODES.UNAUTHORIZED, 
        message: "User Not Found! Invalid Token", 
        err: {} 
      });
      return res.status(HTTP_CODES.UNAUTHORIZED).send(resData);
    }
    
    if (user.length > 0) {
      for (let i = 0; i < user[0].token.length; i++) {
        if (user.length >= 1 && (user[0].token[i] === token)) {
          next();
        }
      }
    }
    else {
      const resData = customResponse({ 
        code: HTTP_CODES.UNAUTHORIZED, 
        message: "Invalid Token. Please Login Again", 
        data: {} });
      return res.status(HTTP_CODES.UNAUTHORIZED).send(resData);
    }
  } catch (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({ 
      code: HTTP_CODES.UNAUTHORIZED, 
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 
      data: {} });
    return res.status(HTTP_CODES.UNAUTHORIZED).send(resData);
  }
};

/**
 * Check whether the loggedin user is having admin role or not.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const isAdmin = async(req, res, next) => {
  try {
    const userId = req.userId;
    const userExist = await User.findById(userId, {role:1, isAdmin:1}).populate("role",{ _id:1, role:1 });
    if (!userExist){
      const resData = customResponse({ 
        code: HTTP_CODES.BAD_REQUEST, 
        message: "User Doesn't Exist", 
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    if (String(userExist.role.role) === ROLES.ADMIN || userExist.isActive ){
      next()
    }
    else {
      const resData = customResponse({ 
        code: HTTP_CODES.FORBIDDEN, 
        message: "Require Admin ROle", 
        data: {} });
      return res.status(HTTP_CODES.FORBIDDEN).send(resData);
    }
  } catch (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({ 
      code: HTTP_CODES.INTERNAL_SERVER_ERROR, 
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

/**
 * Check whether the loggedin user is having manager role or not.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const isManager = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ message: err });
      return;
    }

    userType.find(
      {
        role: { $in: user.role },
      },
      (err, roles) => {
        if (err) {
          res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].role === "MANAGER") {
            next();
            return;
          }
        }

        res.status(HTTP_CODES.FORBIDDEN).send({ message: "Require Manager Role!" });
        return;
      }
    );
  });
};

/**
 * Check whether the loggedin user is having user role or not.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const isUser = async(req, res, next) => {
  try {
    const userId = req.userId;
    const userExist = await User.findById(userId, {role:1,}).populate("role", { _id:1, role:1 });
    if (!userExist){
      const resData = customResponse({ 
        code: HTTP_CODES.BAD_REQUEST, 
        message: `User Doesn't Exist!`, 
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    if (String(userExist.role.role) === ROLES.USER){
      next()
    }
    else {
      const resData = customResponse({ 
        code: HTTP_CODES.FORBIDDEN, 
        message: `Require User Role!`, 
      });
      return res.status(HTTP_CODES.FORBIDDEN).send(resData);
    }
  } catch (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({ 
      code: HTTP_CODES.FORBIDDEN, 
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 
    });
    return res.status(HTTP_CODES.FORBIDDEN).send(resData);
  }
};

const verifyRefreshToken = (req, res, next) => {
  let token = req.headers.refresh;

  if (!token) {
    const resData = customResponse({ 
      code: HTTP_CODES.FORBIDDEN, 
      message: "No refresh token provided",
    });
    return res.status(HTTP_CODES.FORBIDDEN).send(resData);
  }

  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.decode = decoded;
    next();
  });
};

const isAdminOrManager = (req, res, next) => {
  try {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ message: err });
        return;
      }
      if (user && user.role) {
        userType.find(
          {
            role: { $in: user.role },
          },
          (err, roles) => {
            if (err) {
              res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ message: err });
              return;
            }
            for (let i = 0; i < roles.length; i++) {
              if (roles[i].role === "ADMIN" || roles[i].role === "MANAGER") {
                next();
                return;
              }
            }
            res.status(HTTP_CODES.FORBIDDEN).send({ message: "Require Admin Or Manager Role!" });
            return;
          }
        );
      }
      else {
        res.status(HTTP_CODES.FORBIDDEN).send({ message: "User Not Found!!" });
        return;
      }

    });
  }
  catch (error) {
    logger.customLogger.log('error', error);
    return catchError(error, res);
  }

};

const isActive = async(req, res, next) => {
  try {
    const userId = req.userId;
    const userExist = await User.findById(userId, { isActive:1 });
    if (!userExist){
      const resData = customResponse({ 
        code: HTTP_CODES.BAD_REQUEST, 
        message: "User Doesn't Exist", 
        data: {} });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    if (userExist.isActive){
      next();
    }
    else{
      const resData = customResponse({ 
        code: HTTP_CODES.BAD_REQUEST, 
        message: "User is Inactive", 
        data: {} });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
  } catch (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({ 
      code: HTTP_CODES.INTERNAL_SERVER_ERROR, 
      message: ERROR_MESSAGES.SOMETHING_WENT_WRONG, 
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

/**
 * Check whether the loggedin user is having super admin role or not.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const isSuperAdmin = async(req, res, next) => {
  try {
    const userId = req.userId;
    const userExist = await User.findById(userId, {role:1,}).populate("role", {_id:1, role:1});
    if (!userExist){
      const resData = customResponse({ 
        code: HTTP_CODES.BAD_REQUEST, 
        message: "Super Admin Doesn't Exist", 
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    if (String(userExist.role.role) === ROLES.SUPER_ADMIN ){
      next()
    }
    else {
      const resData = customResponse({ 
        code: HTTP_CODES.FORBIDDEN, 
        message: "Require Super Admin Role!", 
      });
      return res.status(HTTP_CODES.FORBIDDEN).send(resData);
    }
  } catch (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({ 
      code: HTTP_CODES.FORBIDDEN, 
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 
    });
    return res.status(HTTP_CODES.FORBIDDEN).send(resData);
  }
};


const authJwt = {
  verifyToken,
  isAdmin,
  isManager,
  isUser,
  verifyOrg,
  verifyLogOut,
  verifyRefreshToken,
  isAdminOrManager,
  isActive,
  isSuperAdmin,
};
module.exports = authJwt;
