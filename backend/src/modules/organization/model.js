const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ORG_TYPES, ORG_TYPE_ARRAY, WEEKDAYS_ARRAY, WEEKDAYS, TIMEZONES } = require("../../utility/constants");
const moment = require('moment');
const { env } = require('../../config/environment');
const config = require(`../../config/${env}.config`);

const organizationSchema =  new mongoose.Schema({
  orgName: {
    type: String,
    required: true,
  },
  orgUsername: {
    type: String,
    required: true,
    unique: true,
  },
  adminName: {
    type: String,
    required: true,
  },
  adminEmail: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
  },
  /**
  orgAddress: [{
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
  }],
  */
  location: {
    type: String,
    required: false
  },
  adminPhone: {
    type: String,
    required: true,
  },
  adminPhoneSecondary: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  orgType: {
    type: String,
    enum: { values: ORG_TYPE_ARRAY },
    default: ORG_TYPES.PUBLIC,
    required: false,
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: moment().format(),
  },
  settings:{
    weeklySummary: {
      day: {
          type: String,
          enum: { values: WEEKDAYS_ARRAY },
          default: WEEKDAYS.SUNDAY,
          required: false,
      },
      time: {
          type: String,
          required: false,
          default: '10:00'
      },
      timeZone: {
          type: String,
          default: TIMEZONES.IST,
          required: false
      }
    },
    reminders: {
      day: {
        type: String,
        enum: { values: WEEKDAYS_ARRAY },
        default: WEEKDAYS.SUNDAY,
        required: false,
      },
      time: {
        type: String,
        default: '10:00',
        required: false
      },
      timeZone: {
        type: String,
        default: TIMEZONES.IST,
        required: false
      }
    },
  },
  vision: {
    type: String,
  },
  mission: {
    type: String,
  },
  coreValues: {
    type: String,
  },
  companyBrief: {
    type: String,
  }
});

/**
 * Presave async function to save password by encrypting
 */
organizationSchema.pre("save", async function(next){
  if(this.password){
    const saltOrRound = parseInt(config.BCRYPT_SALTORROUND);
    const hashedPassword = await bcrypt.hash(this.password, saltOrRound);
    this.password = hashedPassword;
  }
  next();
});

const Organization  = mongoose.model("Organization", organizationSchema);
module.exports = Organization;
