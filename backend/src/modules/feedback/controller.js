const feedback = require("./model");
const { customResponse } = require("../../utility/helper");
const { yearsToQuarters } = require("../../utility/quarter");
const moment = require("moment");
const User = require("../user/model");
const { ROLES, HTTP_CODES } = require("../../utility/constants");
const userType = require("../userType/model");

const createfeedback = async (req, res) => {
  let code;
  let quarter = yearsToQuarters();
  const year = moment().year();
  let quartermon = (await quarter).toString();
  const userData = await User.findById(req.params.userid);
  try {
    code = 201;
    if (userData){
      const feedbacks = await feedback({
        projectLead: userData?.projectLead,
        year: year,
        quarter: quartermon,
        manager: userData?.reportingManager,
        user: req.params.userid
      });
      feedbacks.save();
      message = "Feedback created";
      const response = customResponse({
        code: HTTP_CODES.CREATED,
        message,
        data: feedbacks
      });
      return res.status(HTTP_CODES.CREATED).send(response);
    }
  } catch (error) {
    code = HTTP_CODES.INTERNAL_SERVER_ERROR;
    const message = "Feedback couldn't save";
    const response = customResponse({ code, message, err: error });
    return res.status(code).send(response);
  }
};

const updatefeedback = async (req, res) => {
  let role = req.decode.role;
  const getRole = await userType.findById(role,{_id:1, role:1});

  const feedbackId = req.params.feedbackid;
  if (getRole.role == ROLES.ADMIN || req.decode.isAdmin) {
    try {
      const feedbacks = await feedback.findByIdAndUpdate(
        { _id: feedbackId },
        {
          final_rating: req.body.final_rating,
          comments: req.body.comments,
        },
        {
          new: true
        }
      );
      const message = "Feedback received";
      const response = customResponse({
        code: HTTP_CODES.CREATED,
        message,
        data: feedbacks
      });
      return res.status(HTTP_CODES.CREATED).send(response);
    } catch (error) {
      code = HTTP_CODES.INTERNAL_SERVER_ERROR;
      const message = "Feedback couldn't save";
      const response = customResponse({
        code: HTTP_CODES.INTERNAL_SERVER_ERROR,
        message,
        err: error
      });
      return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(response);
    }
  }
  else if (getRole.role == ROLES.MANAGER) {
    try {
      const feedbacks = await feedback.findByIdAndUpdate(
        {
          _id: feedbackId
        },
        {
          manager_rating: req.body.manager_rating,
          manager_feedback_okrs: req.body.manager_feedback_okrs
        },
        {
          new: true
        }
      );
      message = "Feedback received";
      const response = customResponse({
        code :HTTP_CODES.CREATED,
        message,
        data: feedbacks
      });
      return res.status(HTTP_CODES.CREATED).send(response);
    } catch (error) {
      code = HTTP_CODES.INTERNAL_SERVER_ERROR;
      const message = "Feedback couldn't save";
      const response = customResponse({ code, message, err: error });
      return res.status(code).send(response);
    }
  }
  else if (getRole.role == ROLES.USER) {
    let isLead = null;
    let feedbacks
    try {
      isLead = await feedback.findById({ _id: feedbackId })
      if (isLead.projectLead == req.userId) {
        feedbacks = await feedback.findByIdAndUpdate(
          { _id: feedbackId },
          {
            project_feedback: req.body.project_feedback
          },
          {
            new: true
          }
        );
      }
      else {
        feedbacks = await feedback.findByIdAndUpdate(
          {
            _id: feedbackId
          },
          {
            user_rating: req.body.user_rating,
            user_feedback_okrs: req.body.user_feedback_okrs,
          },
          {
            new: true
          }
        );
      }

      message = "Feedback received";
      const response = customResponse({ code:HTTP_CODES.CREATED, message, data: feedbacks });
      return res.status(HTTP_CODES.CREATED).send(response);
    } catch (error) {
      code = HTTP_CODES.INTERNAL_SERVER_ERROR;
      const message = "Feedback couldn't save";
      const response = customResponse({ code, message, err: error });
      return res.status(code).send(response);
    }
  }
}

/**
 * Get Feedback List of User  based on quarter.
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getfeedback = async (req, res) => {
  try {
    const userID = req.userId;
    let quarter = yearsToQuarters();
    let quartermon = req.query.quarter ? req.query.quarter: (await quarter).toString();
    const getfeed = await feedback.find({ user: userID, quarter: quartermon });
    const response = customResponse({
      code:HTTP_CODES.SUCCESS,
      message: `Feedbacks Fetched Successfully`,
      data: getfeed
    });
    return res.status(HTTP_CODES.SUCCESS).send(response);
  } catch (error) {
    const response = customResponse({
      code:HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: `Error Occurred`,
      err: error
    });
    return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(response);
  }
};

module.exports = { createfeedback, getfeedback, updatefeedback };
