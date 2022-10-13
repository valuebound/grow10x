const Joi = require("joi");
const { OKR_TYPES, UNIT_TYPES } = require("../../utility/constants");

const commentSchema = Joi.object().keys({
  text: Joi.string(),
  commentedBy: Joi.string(),
}).options({ abortEarly: false });


const krsSchema = Joi.object().keys({
  keyResult: Joi.string(),
  target: Joi.number().greater(-1),
  start: Joi.number().greater(-1),
  currentValue: Joi.number().greater(-1),
  isBoolean: Joi.boolean(),
  unit: Joi.string().valid(UNIT_TYPES.BOOLEAN, UNIT_TYPES.NUMBER, UNIT_TYPES.PERCENTAGE),
  comment: Joi.array().items(commentSchema),
}).options({ abortEarly: false });


const createOkrSchema = Joi.object().keys({
    owner: Joi.string(),
    parent: Joi.string(),
    objective: Joi.string(),
    type: Joi.string().valid(OKR_TYPES.COMPANY, OKR_TYPES.INDIVIDUAL),
    krs: Joi.array().items(krsSchema),
    quarter: Joi.string(),
  }).options({ abortEarly: false });



module.exports = { createOkrSchema };