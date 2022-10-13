const Joi = require("joi");

const createTeamSchema = Joi.object().keys({
    teamName: Joi.string().required(),
    lead: Joi.string(),
    parent: Joi.array().optional(),
    users: Joi.array().optional(),
    teams: Joi.array().optional(),
    organization: Joi.string(),
  }).options({ abortEarly: false });


module.exports = { createTeamSchema };