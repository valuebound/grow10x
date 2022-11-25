const Team = require("./model");
const User = require("../user/model");
const { ROLES, HTTP_CODES, ERROR_MESSAGES, OKR_TYPES } = require("../../utility/constants");
const { customResponse, customPagination, getStatsOfOkrWithoutOkrList } = require("../../utility/helper");
const { sendEmail } = require("../../utility/generateEmail");
const { userType } = require('../../models');
const { customLogger } = require("../../utility/logger");
const { teamCreatedTemplate, addedToTeamTemplate, deletedTeamTemplate, updatedTeamTemplate } = require("../../utility/generateTemplate");
const sanitizer = require("sanitize")();
const { createTeamSchema } = require('./schema');
const Okr = require("../okr/model");
const timePeriod = require("../timeperiod/model");

const createTeam = async (req, res) => {
  try {
    const _id = req.userId;
    const teamOwnerDetails = await User.findById(_id);
    const orgId = req?.query?.orgid ? req?.query?.orgid : teamOwnerDetails.organization;
    /**
     * Joi Validation
     */
    const { error } = createTeamSchema.validate(req.body);
    if (error) {
      const resData = customResponse({
        code: HTTP_CODES.UNPROCESSABLE_ENTITY,
        message: `Validation Failed! Invalid request data ${error.message}`,
        err: {},
      });
      return res.status(HTTP_CODES.UNPROCESSABLE_ENTITY).send(resData);
    }
    const team = new Team({
      teamName: req.body.teamName,
      lead: _id,
      parent: req?.body?.parent,
      users: req?.body?.users,
      teams: req?.body?.teams,
      organization: orgId
    });
    await team.save();

    if (team){
      if(team?.users?.length > 0){
        for (i=0; i< team.users.length; i++){
         /**
           * Update every User's teams field
           */
          const findUser = await User.findByIdAndUpdate(
            {
              _id: team.users[i]
            },
            {
              $push :{ teams: team._id }
            },
            {
              new: true
            }
          );
          /**
           * Sending Email to those who have been added to the team.
           */
          const setTeamConfirmMsg = await addedToTeamTemplate(findUser, team.teamName);
          await sendEmail(findUser.email, `GROW10X: Added to the Team`, setTeamConfirmMsg);
        }
      }
    }
    const setTeamCreateConfirmMsg = await teamCreatedTemplate(teamOwnerDetails, team.teamName);
    await sendEmail(teamOwnerDetails.email, `GROW10X: Team is Created`, setTeamCreateConfirmMsg);
    const resData = customResponse({
      code: HTTP_CODES.CREATED,
      message: 'Team created successfully!',
      data: team
    });
    return res.status(HTTP_CODES.CREATED).send(resData);
  } catch (error) {
    customLogger.log('error', `${error}`);
    const resData = customResponse({
      code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
      err: {}
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

const getTeams = async (req, res) => {
  try {
    const _id = req.userId;
    let team;
    const teamOwnerDetails = await User.findOne({ _id });
    const role = req?.decode?.role ? req.decode.role: teamOwnerDetails.role;
    const getRole = await userType.findById(role,{_id:1, role:1});
    const orgId = req?.query?.orgid ? req?.query?.orgid : teamOwnerDetails.organization;
    if (getRole.role === ROLES.ADMIN || req.decode.isAdmin){
      team = await Team.find({ organization: orgId  })
      .populate("lead", { _id: 1, firstName: 1, surname: 1 })
      .populate("users", { _id: 1, firstName: 1, surname: 1, role:1, designation:1, projectDetails:1 })
      .populate("teams", { _id: 1, teamName: 1 })
      .populate("users.role", { _id: 1, role: 1 })
      ;
    }
    /**
    else if(getRole.role === ROLES.MANAGER){
      team = await Team.find({ lead: _id , organization: orgId})
      .populate("lead", { _id: 1, firstName: 1, surname: 1 })
      .populate("users", { _id: 1, firstName: 1, surname: 1, role:1, designation:1, projectDetails:1 })
      .populate("teams", { _id: 1, teamName: 1 })
      .populate("users.role", { _id: 1, role: 1 })
      ;

    }
    */
    else if( getRole.role === ROLES.USER ){
      team = await Team.find({organization: orgId, users: { $in: _id } })
      .populate("lead", { _id: 1, firstName: 1, surname: 1 })
      .populate("users", { _id: 1, firstName: 1, surname: 1, role:1, designation:1, projectDetails:1 })
      .populate("teams", { _id: 1, teamName: 1 })
      .populate("users.role", { _id: 1, role: 1 })
      ;
    }
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: `${team.length} Team's details Fetched Successfully`,
      data: team
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);

  } catch (error) {
    customLogger.log('error', `${error}`);
    const resData = customResponse({
      code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
      err: {}
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

const getAllMembers = async (req, res) => {
  try {
    const status = sanitizer.value(req?.query?.status, 'str');
    const limitNo = sanitizer.value(req?.query?.limit, 'int');
    const page = sanitizer.value(req?.query?.page, 'int');
    let allMembers = [];
    let userData,statsData, paginatedData;
    const _id = req.userId;
    const user = await User.findById(_id).populate('role',{ role: 1 });
    const orgId = req?.query?.orgid ? req?.query?.orgid : user.organization;
    const getCurrentQuarter = await timePeriod.findOne({
      organization: orgId,
      isCurrent: true,
      isDeleted: false,
    },
    {
      _id:1,
      name:1,
    }).sort({ timestamp:-1 });
    let currentQuarter = getCurrentQuarter?._id ? getCurrentQuarter._id : null;
    /**
    const activeCount = await User.find({organization: orgId, isDeleted: false , isActive: true}).count();
    const inactiveCount = await User.find({organization: orgId, isDeleted: false , isActive: false}).count();
    const totalCount =  await User.find({organization: orgId, isDeleted: false}).count();
    */

    if (String(user.role.role) === ROLES.ADMIN || String(user.role.role) === ROLES.SUPER_ADMIN ){
      userData = await User.find(
        { organization: orgId, isDeleted: false , isActive: status === 'true' ? true : status === 'false' ? false : null },
        {
          firstName: 1,
          surname: 1,
          email: 1,
          role: 1,
          designation: 1,
          reportingManager: 1,
          isActive: 1,
          userName: 1,
          avatar: 1,
          phone: 1,
          location: 1,
        }
      ).populate("teams", { _id: 1, teamName: 1 })
      .populate("role", {_id:1, role:1 })
      .populate("reportingManager", { _id:1, firstName:1, surname:1, avatar:1, phone:1, designation:1, email:1 }).sort({ firstName: 1 });

      paginatedData = customPagination(userData, limitNo, page);
      const pageData = paginatedData?.results;
      for (let v = 0; v < paginatedData?.results?.length; v++){
        const getOkrData = await Okr.find({ owner: pageData[v]._id, type: OKR_TYPES.INDIVIDUAL, quarter: currentQuarter, isDeleted: false });
        statsData = await getStatsOfOkrWithoutOkrList(getOkrData, currentQuarter, orgId);
        let statsRequiredData = {
          overallProgress: statsData.overallProgress,
          overallStatus: statsData.overallStatus,
        }
        let data = {
          _id: pageData[v]._id,
          firstName: pageData[v].firstName,
          surname: pageData[v].surname,
          role: pageData[v].role,
          email: pageData[v].email,
          reportingManager: pageData[v].reportingManager,
          isActive: pageData[v].isActive,
          avatar: pageData[v].avatar,
          okrStats: statsData,
          designation: pageData[v].designation,
          userName: pageData[v].userName,
          phone: pageData[v].phone,
          location: pageData[v].location,
        }
        allMembers.push(data);
      }

    }
    else{
      userData = await User.find(
        { organization: orgId, isActive: true, isDeleted: false },
        {
          firstName: 1,
          userName:1,
          surname: 1,
          role: 1,
          email: 1,
          designation: 1,
          reportingManager: 1,
          avatar: 1,
          phone: 1,
          location: 1,
        }
      ).populate("teams", { _id: 1, teamName: 1 })
      .populate("role", {_id:1, role:1 })
      .populate("reportingManager", { _id:1, firstName:1, surname:1, avatar:1, phone:1, designation:1, email:1 }).sort({ firstName: 1});
      paginatedData = customPagination(userData, limitNo, page);
      const pageData = paginatedData?.results;
      for (let v = 0; v < paginatedData?.results?.length; v++){
        const getOkrData = await Okr.find({ owner: pageData[v]._id, type: OKR_TYPES.INDIVIDUAL, quarter: currentQuarter, isDeleted: false });
        statsData = await getStatsOfOkrWithoutOkrList(getOkrData, currentQuarter, orgId);
        let statsRequiredData = {
          overallProgress: statsData.overallProgress,
          overallStatus: statsData.overallStatus,
        }
        let data = {
          _id: pageData[v]._id,
          firstName: pageData[v].firstName,
          surname: pageData[v].surname,
          role: pageData[v].role,
          email: pageData[v].email,
          reportingManager: pageData[v].reportingManager,
          avatar: pageData[v].avatar,
          okrStats: statsData,
          designation: pageData[v].designation,
          userName: pageData[v].userName,
          phone : pageData[v].phone,
          location : pageData[v].location,
        }
        allMembers.push(data);
      }
    }
    const count = userData.length;
    const resultCount = allMembers.length;
    const totalPagesCount = paginatedData?.pageCount;
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: 'All members details & their teams',
      data: {allMembers, count, resultCount, totalPagesCount}
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);
  } catch (error) {
    customLogger.log('error', `${error}`);
    const resData = customResponse({
      code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
      err: {}
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
};

const getTeamsList = async(req, res) => {
  try {
    const _id = req.userId;
    const user = await User.findById(_id);
    const orgId = req?.query?.orgid ? req?.query?.orgid : user.organization;
  const teams = await Team.find({ organization: orgId });
  let teamList = [];
  for( i=0; i<teams.length; i++){
    let data = {
      id : teams[i]._id,
      teamName : teams[i].teamName,
    }
    teamList.push(data);
  }
  const resData = customResponse({
    code: HTTP_CODES.SUCCESS,
    message: `${teams.length} Team's Fetched Successfully!!`,
    data: teamList
  });
  return res.status(HTTP_CODES.SUCCESS).send(resData);
} catch (error) {
  customLogger.log('error', `${error}`);
  const resData = customResponse({
    code: HTTP_CODES.INTERNAL_SERVER_ERROR,
    message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
    err: {}
  });
  return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
}
}

/**
 * Function to Update the Team by its teamID
 * @param {*} req
 * @param {*} res
 */
const updateTeam = async(req, res) => {
  try {
    const teamId = sanitizer.value(req.params.teamid, 'str');
    const findTeam = await Team.findById({ _id : teamId }).populate("lead",{firstName:1,email:1});
    if (!findTeam){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: `Team Not Found !!`
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    const updateTeamData = await Team.findByIdAndUpdate(
      {
        _id : teamId
      },
      {
        teamName: req.body.teamName,
        parent: req?.body?.parent,
        users: req?.body?.users,
        teams: req?.body?.teams,
      },
      {
        new: true
      }
    );
    if (updateTeamData){
      if(updateTeamData?.users?.length > 0){
        for (i=0; i< req?.body?.users.length ; i++){
          /**
           * Update every User's teams field
           */
          const findUser = await User.findByIdAndUpdate(
            {
              _id: req?.body?.users[i]
            },
            {
              $push : { teams: updateTeamData._id }
            },
            {
              new: true
            }
          );

          /**
           * Sending Email to those who have been added to the team.
           */
          const setTeamConfirmMsg = await addedToTeamTemplate(findUser, updateTeamData.teamName);
          await sendEmail(findUser.email, `GROW10X: Added to the Team`, setTeamConfirmMsg);
        }
      }
    }
    const setTeamUpdateConfirmMsg = await updatedTeamTemplate(findTeam.lead, updateTeamData.teamName);
    await sendEmail(findTeam.lead.email, `GROW10X: Team is Updated`, setTeamUpdateConfirmMsg);
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: `Team :- ${updateTeamData.teamName} is Updated.`,
      data: updateTeamData
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);

  } catch (error) {
    customLogger.log('error', `${error}`);
    if (error.kind === 'ObjectId'){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "Invalid team id Provided",
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
}

/**
 *  Function to Delete The team by its teamID
 * @param {*} req
 * @param {*} res
 * @returns
 */
const deleteTeam = async(req, res) => {
  try {
    const teamId = sanitizer.value(req.params.teamid, 'str');
    const findTeam = await Team.findById(teamId).populate("lead",{firstName:1,email:1});
    if (!findTeam){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: `Team Not Found !!`,
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    else if(findTeam){
      for (i=0; i< findTeam.users.length; i++){
        /**
         * Update every User's teams field
         */
        const updateUser = await User.findByIdAndUpdate(
          {
            _id: findTeam.users[i]
          },
          {
            $pull : { teams: findTeam._id }
          },
          {
            new: true
          }
        );
      }
    }

    const deleteTeamData = await Team.findByIdAndDelete(teamId);
    const setTeamDeleteConfirmMsg = await deletedTeamTemplate(findTeam.lead, deleteTeamData.teamName);
    await sendEmail(findTeam.lead.email, `GROW10X: Team is Deleted`, setTeamDeleteConfirmMsg);
    const resData = customResponse({
      code: HTTP_CODES.SUCCESS,
      message: `${deleteTeamData.teamName} is deleted.`,
      data: deleteTeamData
    });
    return res.status(HTTP_CODES.SUCCESS).send(resData);

  } catch (error) {
    customLogger.log('error', `${error}`);
    if (error.kind === 'ObjectId'){
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "Invalid team id Provided",
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
}

/**
 * Function to check whether the Team Name Available or not
 * @param {*} req
 * @param {*} res
 * @returns
 */
const teamnNameAvailable = async(req, res) => {
  try {
    const _id = req.userId;
    const user = await User.findById(_id);
    const orgId = req?.query?.orgid ? req?.query?.orgid : user.organization;
    const teamName = req.query.teamName;
    if (teamName || teamName !== "" || teamName !== null){
      const result = await Team.findOne({
        organization: orgId,
        teamName: new RegExp("^" + teamName + "$", 'i'),
      })
      if (result){
        const resData = customResponse({
          code: HTTP_CODES.BAD_REQUEST,
          message: `Team Name - ${teamName} is not available.`,
          data: teamName
        });
        return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
      }
      const resData = customResponse({
        code: HTTP_CODES.SUCCESS,
        message: `Team Name - ${teamName} is available.`,
        data: teamName
      });
      return res.status(HTTP_CODES.SUCCESS).send(resData);
    }
    else{
      const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: `Provide Team Name`,
        data: {}
      });
      return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
  } catch (error) {
    customLogger.log('error', `${error}`);
    const resData = customResponse({
      code: HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
      err: {}
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(resData);
  }
}
module.exports = { createTeam, getTeams, getAllMembers ,getTeamsList, updateTeam, deleteTeam, teamnNameAvailable };
