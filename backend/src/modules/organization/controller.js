const { nanoid } = require("nanoid");
const organizationModel = require("./model");
const userModel = require("../user/model");
const { customResponse, getAvatarUrl, getStatsOfOkrWithoutOkrList} = require("../../utility/helper");
const { sendEmail } = require("../../utility/generateEmail");
const { generateMessage } = require("../../utility/generateTemplate");
const { orgSignup_JoiSchema, orgDetailsUpdate_JoiSchema } = require("./schema");
const { userType } = require("../../models");
const { HTTP_CODES, ROLES, OKR_TYPES } = require("../../utility/constants");
const logger = require("../../utility/logger");
const User = require("../user/model");
const Okr = require("../okr/model");
const timePeriod = require("../timeperiod/model");
const sanitizer = require("sanitize")();
const moment = require('moment');
const { env } = require('../../config/environment');
const config = require(`../../config/${env}.config`);
const s3Client = require("../../utility/s3config");
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
global.__basedir = __dirname + "/..";


const createOrganizationAccount = async (req, res) => {
  let message;
  /**
   * Joi Validation
   */
  const { error } = orgSignup_JoiSchema.validate(req.body);
  if (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({
      code: HTTP_CODES.UNPROCESSABLE_ENTITY,
      message: "Validation Failed! Invalid request data",
      err: error,
    });
    return res.status(HTTP_CODES.UNPROCESSABLE_ENTITY).send(resData);
  }
  try {
    let randomPassword = nanoid(10);
    const userAdmin = {
      orgName: req.body.orgName,
      orgUsername: req.body.orgUsername,
      adminName: req.body.adminName,
      adminEmail: req.body.adminEmail,
      location: req.body.location,
      adminPhone: req.body.adminPhone,
      adminPhoneSecondary: req.body?.adminPhoneSecondary ? req.body?.adminPhoneSecondary : null ,
      orgType: req?.body?.orgType,
      password: randomPassword,
      createdAt: moment().format(),
    };
    const admins = await organizationModel(userAdmin);
    /**
     * Get Admin Role id From Db - userType Collection
     */
    const getRoleId = await userType.findOne({role: ROLES.ADMIN}, {_id:1, role:1});
    let first_name, new_surname
    if (req.body.adminName){
      let splitName = req.body.adminName.split(" ");
      first_name = splitName[0];
      new_surname = splitName[1];
    }
    const getAvatar = await getAvatarUrl(`${first_name}${new_surname}`);
    const adminUser = await userModel({
      firstName: first_name,
      surname: new_surname,
      user_name: req.body.orgUsername,
      email: req.body.adminEmail,
      organization: admins._id,
      location: req.body.location,
      phone: req.body?.adminPhone ? req.body?.adminPhone : null ,
      phoneSecondary: req.body?.adminPhoneSecondary ? req.body?.adminPhoneSecondary : null,
      role: getRoleId._id,
      password: randomPassword,
      verified: true,
      isAdmin: true,
      isActive: true,
      isDeleted: false,
      level: 0,
      avatar: getAvatar,
    });
    const savedOrgData = await admins.save();
    const responseData = {
      orgName: savedOrgData.orgName,
      orgUsername: savedOrgData.orgUsername,
      adminName: savedOrgData.adminName,
      adminEmail: savedOrgData.adminEmail,
    }
    adminUser.save();
    const emailMessage = await generateMessage(adminUser, randomPassword);
    await sendEmail(adminUser.email, `OKR Portal: Admin Account Created`, emailMessage);
    message = `Admin account created successfully!! for the organization ${req.body.orgName}`;

    const resData = customResponse({
      code :HTTP_CODES.CREATED,
      message,
      data: responseData
    });
    return res.status(HTTP_CODES.CREATED).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error);
    message = "something went wrong";
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message,
      err: {} });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
};

const getAllUsersAccount = async (req, res) => {
  try {
    const _id = req.userId;
    const user = await userModel.findById(_id);
    const role = req.decode.role;
    const getRole = await userType.findById(role,{_id:1, role:1});
    const orgId = req?.query?.orgid ? req?.query?.orgid : user?.organization;
    const orgExist = await organizationModel.findById({_id:orgId});
    if (!orgExist){
      const resData = customResponse({
        code : HTTP_CODES.BAD_REQUEST,
        message: "Invalid Data Requested. Org Not Found!!",
        data: {}
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    let userData = [], admins=[];
    if (getRole.role == ROLES.ADMIN || req.decode.isAdmin ){
      admins = await userModel.find({ organization: orgId , isDeleted:false });
      for( i=0; i<admins.length; i++){
        let surnameExist = admins[i].surname ? admins[i].surname: " ";
        let data = {
          name : `${admins[i]?.firstName} ${surnameExist}`,
          email : admins[i]?.email,
          phone : admins[i]?.phone,
          department : admins[i]?.role,
          designation: admins[i]?.designation,
          location: admins[i]?.location,
          isActive: admins[i]?.isActive,
          isAdmin: admins[i]?.isAdmin,
        }
        userData.push(data);
      }
    }
    else{
      admins = await userModel.find({ organization: orgId , isActive: true });
      for( i=0; i<admins.length; i++){
        let surnameExist = admins[i]?.surname ? admins[i]?.surname: " ";
        let data = {
          name : `${admins[i]?.firstName} ${surnameExist}`,
          email : admins[i]?.email,
          phone : admins[i]?.phone,
          department : admins[i]?.role,
          designation: admins[i]?.designation,
          location: admins[i]?.location,
        }
        userData.push(data);
      }
    }

    const resData = customResponse({
      code : HTTP_CODES.SUCCESS,
      message: `${ admins.length } User's of My Org Fetched successfully!!`,
      data: userData
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: "Falied to get my organization User's account list",
      err: {}
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
};

const getOrganizationList = async(req, res) => {
  try {
    const getOrgData = await organizationModel.find({ isDeleted: false },{ password:0, __v:0 }).sort({ createdAt:-1 });
    const resData = customResponse({
      code : HTTP_CODES.SUCCESS,
      message: "Registered Organization's list",
      data: getOrgData
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: "Falied to get organization's list",
      err: {}
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
}

const updateMyOrg = async (req, res) => {
  try {
    const orgidbyParams = sanitizer.value(req.params.orgid, 'str');
    const orgId = req?.query?.orgid ? req.query?.orgid : orgidbyParams;
    const getOldDataOfUser = await organizationModel.findById(orgId);
    /**
     * Email Duplicate Validation
     */
     if (getOldDataOfUser.adminEmail !== req?.body?.adminEmail){
      const checkEmailExist = await User.findOne({ adminEmail : req.body.adminEmail}).count();
      const checkEmailExistOrgModel = await organizationModel.findOne({ adminEmail : req.body.adminEmail }).count();
      if (checkEmailExist > 0 && checkEmailExistOrgModel > 0){
        const resData = customResponse({
          code: HTTP_CODES.UNPROCESSABLE_ENTITY,
          message: `Email '${req.body.adminEmail}' is already exist`,
          err: {},
        });
        return res.status(HTTP_CODES.UNPROCESSABLE_ENTITY).send(resData);
      }
    }
    /**
     * Joi Validation
     */
    const { error } = orgDetailsUpdate_JoiSchema.validate(req.body);
    if (error) {
      logger.customLogger.log('error', error);
      const resData = customResponse({
        code: HTTP_CODES.UNPROCESSABLE_ENTITY,
        message: "Validation Failed! Invalid request data",
        err: error,
      });
      return res.status(HTTP_CODES.UNPROCESSABLE_ENTITY).send(resData);
    }
    const updateOrg = await organizationModel.findByIdAndUpdate(
      orgId,
      {
        orgName: req?.body?.orgName,
        orgUsername: req?.body?.orgUsername,
        adminName: req?.body?.adminName,
        adminEmail: req?.body?.adminEmail,
        adminPhone: req?.body?.adminPhone,
        adminPhoneSecondary : req?.body?.adminPhoneSecondary,
        location: req?.body?.location,
        settings: req?.body?.settings,
      },
      {
        new: true,
      }
    );
    /**
    if (updateOrg || updateOrg!== null ){
      await runCronWhenNotificationUpdates();
    }
     */
    /**
     * Update data in User Model Also
     */
    if (req.body.adminEmail || req.body.adminName || req.body.adminPhone ){
      let fName = req?.body?.adminName.split(" ")[0];
      let sName = req?.body?.adminName.split(" ")[1];
      const updateUserData = await User.findOneAndUpdate({ email: getOldDataOfUser.adminEmail },
        {
          firstName: fName ? fName : getOldDataOfUser.adminName.split(" ")[0],
          surname: sName ? sName : getOldDataOfUser.adminName.split(" ")[1],
          email: req?.body?.adminEmail,
          phone: req?.body?.adminPhone,
          location: req?.body?.location,
        },
        {
          new: true,
        })
    }
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: `${updateOrg?.orgName} is Updated Successfully`,
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);

  } catch (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: "Falied to Update My Organization",
      err: {}
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
}

const getMyOrgProfile = async (req, res) => {
  try {
    const _id = req.userId;
    const user = await userModel.findById(_id);
    const orgId = req?.query?.orgid ? req?.query?.orgid : user.organization;
    const getOrgData = await organizationModel.findById(
      orgId,
      {
        password:0, __v:0, isDeleted:0
      });
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: "Successfully Fetch My Org Profile",
      data: getOrgData
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);

  } catch (error) {
    logger.customLogger.log('error', error);
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: "Falied to Fetch My Org Profile",
      err: {}
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
}

const deleteOrg = async (req, res) => {
  try {
    const orgId = sanitizer.value(req.params.orgid, 'str');
    const deleteOrg = await organizationModel.findByIdAndUpdate(
      orgId,
      {
        isDeleted: true
      },
      {
        new: true,
      }
    );

    if (deleteOrg.isDeleted === true){
      const findUsers = await User.find({ organization: deleteOrg._id });
      for (let i =0 ; i< findUsers.length ; i++){
        const markDeleteUser = await User.findByIdAndUpdate(findUsers[i]._id, {isDeleted: true}, { new: true });
      }
    }
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: `${deleteOrg.orgName} organization is Deleted Successfully`,
      data: deleteOrg
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error);
    if (error.kind === 'ObjectId'){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "Invalid Org id Provided",
        err: {},
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: "Failed to Delete the Organization",
      err: {}
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
}

const orgChart = async (req, res) => {
  try {
    const _id = req.userId;
    const user = await User.findById(_id);
    const orgId = req?.query?.orgid ? req?.query?.orgid : user.organization;
    const getAdminRoleId = await userType.findOne({ role: ROLES.ADMIN }, { _id:1 });
    const findOrgAdmin = await User.findOne({ role: getAdminRoleId._id, organization: orgId, isAdmin: true },
      {
        _id:1,
        firstName:1,
        surname:1,
        designation:1,
        whoReportsMe:1,
        isActive:1,
        isDeleted:1,
      });
    const getCurrentQuarter = await timePeriod.findOne({
      organization: orgId,
      isCurrent: true,
      isLocked: false,
      isDeleted: false,
    },
    {
      _id:1,
      name:1,
    }).sort({ timestamp:-1 });
    let currentQuarter = getCurrentQuarter?._id ? getCurrentQuarter._id : null;

    async function getUserData(data){
      let newData = [];
      for (let i = 0; i<data?.length ; i++){
        const findData = await User.findOne({_id: String(data[i]), isActive: true, isDeleted: false},
        {
          _id:1,
          firstName:1,
          surname:1,
          designation:1,
          whoReportsMe:1,
          avatar: 1,
        });
        if (findData && findData !== null ){
          const getOkrData = await Okr.find({ owner: findData._id, type: OKR_TYPES.INDIVIDUAL, quarter:currentQuarter, isDeleted:false });
          const statsData = await getStatsOfOkrWithoutOkrList(getOkrData, currentQuarter, orgId);
          let nested = [];
          if ( findData?.whoReportsMe && findData?.whoReportsMe?.length > 0){
            const res = await getUserData(findData.whoReportsMe);
            nested = res;
          }
          let Obj = {
            id: findData?._id,
            isActive: findData?.isActive,
            isDeleted: findData?.isDeleted,
            value: {
              name: `${findData?.firstName? findData?.firstName: ''} ${findData?.surname ? findData?.surname : ''}`,
              title: findData?.designation,
              items: statsData,
            },
            children: nested,
          }
          newData[i] = Obj;
        }
      }
      return newData;
    }
    const new_data = await getUserData(findOrgAdmin.whoReportsMe);
    const getOkrData = await Okr.find({ owner: findOrgAdmin._id, type: OKR_TYPES.INDIVIDUAL, quarter:currentQuarter, isDeleted:false });
    const statsData = await getStatsOfOkrWithoutOkrList(getOkrData, currentQuarter, orgId);
    let data = {
      id: findOrgAdmin._id,
      value: {
        name: `${findOrgAdmin.firstName? findOrgAdmin.firstName: ''} ${findOrgAdmin.surname ? findOrgAdmin.surname : ''}`,
        title: findOrgAdmin.designation,
        items: statsData ? statsData : [],
      },
      children: new_data ? new_data : []
    }

    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: "Successfully Fetch the Org Chart",
      data: data
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error.stack);
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: "Failed to Fetch the Organization Chart",
      err: {}
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
}

const getCompanyDetails = async (req, res) => {
  try {
    const _id = req.userId;
    const user = await userModel.findById(_id);
    const orgId = req?.query?.orgid ? req?.query?.orgid : user.organization;
    const getOrgData = await organizationModel.findById(orgId,
      {
        vision:1,
        mission:1,
        coreValues:1,
        companyBrief:1,
        orgName:1,
        logo:1,
        logoUrl:1,
      }
    )
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: "Successfully Fetch the Organization Details",
      data: getOrgData
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error.stack);
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: "Failed to Fetch the Organization Details",
      err: {}
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
}

const updateCompanyDetails = async(req, res) => {
  try {
    const _id = req.userId;
    const user = await userModel.findById(_id);
    const orgId = req?.query?.orgid ? req?.query?.orgid : user.organization;
    const updateOrgData = await organizationModel.findByIdAndUpdate(orgId,
      {
        vision: req?.body?.vision,
        mission: req?.body?.mission,
        coreValues: req?.body?.coreValues,
        companyBrief: req?.body?.companyBrief,
      },
      {
        new: true
      }
    )
    const responseData = {
      _id : updateOrgData._id,
      orgName: updateOrgData.orgName,
      vision: updateOrgData.vision,
      mission: updateOrgData.mission,
      coreValues: updateOrgData.coreValues,
      companyBrief: updateOrgData.companyBrief,
    }
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: "Successfully Update the Organization Details",
      data: responseData
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error.stack);
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: "Failed to Update the Organization Details",
      err: {}
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
}

const updateCompanyLogo = async (req, res) => {
  const userId = req.userId;
  const getUserData = await User.findById(userId, {organization:1, role:1})
    .populate('organization', {_id:1})
    .populate('role', {_id:1, role:1});
  if (req.file){
    const arr = req?.file?.originalname.split('.');
    let len = arr?.length;
    const ext = arr[len-1];
    let orgId;
    if (getUserData.role.role === ROLES.ADMIN){
      orgId = getUserData?.organization?._id;
    }
    if (getUserData.role.role === ROLES.SUPER_ADMIN){
      orgId = req?.params?.orgid;
    }
    const fileName = `${orgId}-${arr[0]}.${ext}`;
    
    const blob = fs.readFileSync(req.file.path)
    const data = {
      Key: fileName,
      Body: blob,
      ContentEncoding: req.file.encoding,
      ContentType: "image",
      Bucket: config.AWS_BUCKET_NAME,
    };
    const path = __basedir + "/uploads/logo/" + req.file.filename;
    await unlinkAsync(path);

    s3Client.putObject(data, async function (error, data) {
      if (error) {
        const resData = customResponse({
          code: HTTP_CODES.BAD_REQUEST,
          message: `Failed to Upload Company Logo.`,
          err: error,
        });
        return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
      } else {
        const updateInDb = await organizationModel.findByIdAndUpdate(orgId, 
          {
            logo: fileName,
            logoUrl: `${config.AWS_BUCKET_URL}${fileName}`
          },
          {
            new: true,
          });
        const resData = customResponse({
          code: HTTP_CODES.SUCCESS,
          message: `Company Logo Uploaded Successfully`,
        });
        return res.status(HTTP_CODES.SUCCESS).send(resData);
      }
    });
  }else {
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: `Image is unable to processed`,
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
}

const deleteCompanyLogo = async (req, res) => {
  const userId = req.userId;
  const getUserData = await User.findById(userId, {organization:1, role:1})
    .populate('organization', {_id:1})
    .populate('role', {_id:1, role:1});
  const fileName = sanitizer.value(req.params.filename, 'str');
  if (fileName.length === 0) {
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: "Invalid Data. File Name Not Provided",
      err: {}
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
  let orgId;
  if (getUserData.role.role === ROLES.ADMIN){
    orgId = getUserData?.organization?._id;
  }
  if (getUserData.role.role === ROLES.SUPER_ADMIN){
    orgId = req?.params?.orgid;
  }
  const params = {
    Key: fileName,
    Bucket: config.AWS_BUCKET_NAME,
  };
  s3Client.deleteObject(params, async(error, data) => {
    if (error) {
      logger.customLogger.log('error', error)
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: `Failed to delete company logo`,
        err: error,
      });
      return res.status( HTTP_CODES.BAD_REQUEST).send(resData);
    } else {
      const updateInDb = await organizationModel.findByIdAndUpdate(orgId, 
        {
          logo: '',
          logoUrl: ''
        },
        {
          new: true,
        });
      const resData = customResponse({
        code: HTTP_CODES.SUCCESS,
        message: `Successfully Deleted Logo.`,
      });
      return res.status(HTTP_CODES.SUCCESS).send(resData);
    }
  });
}

const orgChartListView = async (req, res) => {
  try {
    const _id = req.userId;
    const user = await User.findById(_id);
    const orgId = req?.query?.orgid ? req?.query?.orgid : user.organization;
    const getAdminRoleId = await userType.findOne({ role: ROLES.ADMIN }, { _id:1 });
    const findOrgAdmin = await User.findOne({ role: getAdminRoleId._id, organization: orgId, isAdmin: true },
      {
        _id:1,
        firstName:1,
        surname:1,
        designation:1,
        whoReportsMe:1,
        isActive:1,
        isDeleted:1,
        avatar:1,
      });
    const getCurrentQuarter = await timePeriod.findOne({
      organization: orgId,
      isCurrent: true,
      isLocked: false,
      isDeleted: false,
    },
    {
      _id:1,
      name:1,
    }).sort({ timestamp:-1 });
    let currentQuarter = getCurrentQuarter?._id ? getCurrentQuarter._id : null;

    async function getUserData(data){
      let newData = [];
      for (let i = 0; i<data?.length ; i++){
        const findData = await User.findOne({_id: String(data[i]), isActive: true, isDeleted: false},
        {
          _id:1,
          firstName:1,
          surname:1,
          designation:1,
          whoReportsMe:1,
          avatar: 1,
        });
        if (findData && findData !== null ){
          const getOkrData = await Okr.find({ owner: findData._id, type: OKR_TYPES.INDIVIDUAL, quarter:currentQuarter, isDeleted:false });
          const statsData = await getStatsOfOkrWithoutOkrList(getOkrData, currentQuarter, orgId);
          let nested = [];
          if ( findData?.whoReportsMe && findData?.whoReportsMe?.length > 0){
            const res = await getUserData(findData.whoReportsMe);
            nested = res;
          }
          let Obj = {
            key: findData?._id,
            title: `${findData?.firstName? findData?.firstName: ''} ${findData?.surname ? findData?.surname : ''}`,
            children: nested,
            designation: findData?.designation,
            avatar: findData?.avatar,
            value: statsData ? statsData : [],
          }
          newData[i] = Obj;
        }
      }
      return newData;
    }
    const new_data = await getUserData(findOrgAdmin.whoReportsMe);
    const getOkrData = await Okr.find({ owner: findOrgAdmin._id, type: OKR_TYPES.INDIVIDUAL, quarter:currentQuarter, isDeleted:false });
    const statsData = await getStatsOfOkrWithoutOkrList(getOkrData, currentQuarter, orgId);
    let data = {
      key: findOrgAdmin._id,
      title: `${findOrgAdmin.firstName? findOrgAdmin.firstName: ''} ${findOrgAdmin.surname ? findOrgAdmin.surname : ''}`,
      children: new_data ? new_data : [],
      designation: findOrgAdmin?.designation,
      avatar: findOrgAdmin?.avatar,
      value: statsData ? statsData : [],
    }

    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: "Successfully Fetch the Org Chart",
      data: data
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    logger.customLogger.log('error', error.stack);
    const resData = customResponse({
      code: HTTP_CODES.BAD_REQUEST,
      message: "Failed to Fetch the Organization Chart",
      err: {}
    });
    return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
  }
}


module.exports = {
  createOrganizationAccount,
  getAllUsersAccount,
  getOrganizationList,
  updateMyOrg,
  getMyOrgProfile,
  deleteOrg,
  orgChart,
  getCompanyDetails,
  updateCompanyDetails,
  updateCompanyLogo,
  deleteCompanyLogo,
  orgChartListView,
};
