const Joi = require("joi");

const addUser_JoiSchemaObj = Joi.object()
  .keys({
    firstName: Joi.string().min(3).max(30).required(),
    surname: Joi.string().min(1).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "in", "org", "xyz"] },
      })
      .required(),
    password: Joi.string().pattern(
      new RegExp('^[a-zA-Z0-9!@#$&()\\-`_.+,/"]{5,30}$')
    ),
    organization: Joi.string(),
    role: Joi.string(),
    reportingManager: Joi.string()
  })
  .options({ abortEarly: false });

const addUser_JoiSchema = Joi.array().items(addUser_JoiSchemaObj);

const login_JoiSchema = Joi.object().keys({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "in","org", "xyz"] },
  }),
  password: Joi.string().pattern(
    new RegExp('^[a-zA-Z0-9!@#$&()\\-`_.+,/"]{5,30}$')
  ),
  idToken: Joi.string().optional(),
  googleid: Joi.string().optional(),
});

const importUserSchema = Joi.object()
  .keys({
    firstName: Joi.string().required(),
    surname: Joi.string(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string(),
    organization: Joi.string(),
    reportingManager: Joi.string(),
    avatar: Joi.string(),
  })
  .options({ abortEarly: false });

const changePasswordSchema = Joi.object().keys({
  oldPassword: Joi.string().pattern(
    new RegExp('^[a-zA-Z0-9!@#$&()\\-`_.+,/"]{5,30}$')
  ),
  newPassword: Joi.string().pattern(
    new RegExp('^[a-zA-Z0-9!@#$&()\\-`_.+,/"]{5,30}$')
  ),
  confirmNewPassword: Joi.string().pattern(
    new RegExp('^[a-zA-Z0-9!@#$&()\\-`_.+,/"]{5,30}$')
  ),
}).options({ abortEarly: false });

const setPassword_schema = Joi.object().keys({
  password: Joi.string().pattern(
    new RegExp('^[a-zA-Z0-9!@#$&()\\-`_.+,/"]{5,30}$')
  ),
  confirmPassword: Joi.string().pattern(
    new RegExp('^[a-zA-Z0-9!@#$&()\\-`_.+,/"]{5,30}$')
  ),
}).options({ abortEarly: false })

const updateSelfProfile = Joi.object().keys({
  _id: Joi.string(),
  firstName: Joi.string().min(3).max(30).required(),
  surname: Joi.string().min(1).max(30).required(),
  email: Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "in",  "org", "xyz"] },
  }).required(),
  reportingManager: Joi.string(),
  designation: Joi.string(),
  userName: Joi.string(),
  gender: Joi.string(),
  phone: Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/),
  dob: Joi.string(),
  about: Joi.string(),
}).options({ abortEarly: false });

const updateUserProfile_JoiSchema = Joi.object().keys({
  _id: Joi.string(),
  firstName: Joi.string().min(3).max(30).required(),
  surname: Joi.string().min(1).max(30).required(),
  email: Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "in", "org", "xyz"] },
  }).required(),
  userName: Joi.string(),
  designation: Joi.string(),
  reportingManager: Joi.string(),
  gender: Joi.string(),
  phone: Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/),
  dob: Joi.string(),
}).options({ abortEarly: false });

module.exports = {
  addUser_JoiSchema,
  login_JoiSchema ,
  importUserSchema,
  changePasswordSchema,
  setPassword_schema,
  updateSelfProfile ,
  updateUserProfile_JoiSchema
};
