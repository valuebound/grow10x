const Joi = require("joi");

const orgSignup_JoiSchema = Joi.object()
  .keys({
    orgName: Joi.string().min(3).max(100).required(),
    orgUsername: Joi.string().min(3).max(30).required(),
    adminName: Joi.string().min(3).max(50).required(),
    adminEmail: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "in", "org", "xyz"] },
      })
      .required(),
    password: Joi.string().pattern(
      new RegExp('^[a-zA-Z0-9!@#$&()\\-`_.+,/"]{5,30}$')
    ),
    orgType: Joi.string(),
    location: Joi.string(),
    adminPhone: Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
  })
  .options({ abortEarly: false });

const orgDetailsUpdate_JoiSchema = Joi.object()
  .keys({
    _id: Joi.string(),
    orgName: Joi.string().min(3).max(100),
    adminName: Joi.string().min(3).max(50),
    adminEmail: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "in", "org", "xyz"] },
      }),
    location: Joi.string(),
    adminPhone: Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/),
    settings: Joi.object(),
  })
  .options({ abortEarly: false });

module.exports = { orgSignup_JoiSchema, orgDetailsUpdate_JoiSchema };
