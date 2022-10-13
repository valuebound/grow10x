const Joi = require("joi");

const addTimePeriodSchema = Joi.object().keys({
    name: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    isCurrent: Joi.boolean().optional(),
  }).options({ abortEarly: false });


module.exports = { addTimePeriodSchema };