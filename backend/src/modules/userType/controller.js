const typeModel = require("./model");
const { customResponse } = require("../../utility/helper");
const { HTTP_CODES, ERROR_MESSAGES, ROLES } = require("../../utility/constants");
const logger = require("../../utility/logger");

const addRole = async (req, res) => {
  try {
    const role = await typeModel({ ...req.body });
    role.save();
    const resData = customResponse({
      code: HTTP_CODES.CREATED,
      message: `${role.role} role added successfully`,
      data: role
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

const getRole = async (req, res) => {
  try {
    allRoles = [];
    const mongoResult = await typeModel.find({}, {_id:1, role:1});
    for (let i = 0; i < mongoResult.length; i++) {
      if( mongoResult[i].role != ROLES.SUPER_ADMIN ){
        data = {
          id : mongoResult[i]._id,
          role : mongoResult[i].role,
        }
        allRoles.push(data);

      }
    }
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: "All roles details",
      data: allRoles
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: "Failed to fetch the Roles",
      err: {}
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
};

module.exports = { addRole, getRole };
