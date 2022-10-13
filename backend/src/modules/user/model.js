const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const CONSTANTS = require("../../utility/constants");
const { env } = require('../../config/environment');
const config = require(`../../config/${env}.config`);

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: false,
  },
  userName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    trim: false,
    lowercase: false,
    unique: true,
    required: true,
  },
  gender:{
    type: String,
    enum: { values: CONSTANTS.GENDER_ARRAY },
    required: false
  },
  dob:{
    type: String,
    required: false
  },
  designation: {
    type: String,
    required: false
  },
  projectDetails:[
    {
      projName: {
        type: String,
      },
      projDesc:{
        type: String,
      },
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
    }
  ],
  location: {
    type: String,
    required: false,
  },
  /**
  userAddress: [
    {
      street: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: false,
      },
      state: {
        type: String,
        required: false,
      },
      country: {
        type: String,
        required: false,
      },
      pincode: {
        type: Number,
        required: false,
      },
    },
  ],
  */
  phone: {
    type: String,
    required: false,
  },
  phoneSecondary: {
    type: String,
    required: false,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserType"
  },
  password: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
  },
  level: {
    type: Number,
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
  /**
  manager: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  */
  projectLead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  currentOkrs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Okr",
    },
  ],
  lastFeedback: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
    },
  ],
  verified: {
    type: Boolean,
    default: true
  },
  /**
  status:{
    type: String,
    uppercase: false,
    enum: { values: CONSTANTS.STATUS_ARRAY },
    default: CONSTANTS.STATUS.ACTIVE,
  },
   */
  reportingManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  whoReportsMe: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  token: {
    type: [String],
    required: false,
  },
  /**
  refreshToken: {
    type: [String],
    required: false,
  },
  */
  passwordChanged: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: Number,
  },
  otpVerified: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    required: false,
  },
});

/**
 * Presave async function to save password by encrypting
 */
userSchema.pre("save", async function (next) {
  if (this.password) {
    const saltOrRound = parseInt(config.BCRYPT_SALTORROUND);
    const hashedPassword = await bcrypt.hash(this.password, saltOrRound);
    this.password = hashedPassword;
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
