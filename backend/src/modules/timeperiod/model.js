const mongoose = require("mongoose");
const moment = require('moment');

const TimePeriod = mongoose.model(
  "TimePeriod",
  new mongoose.Schema({
    name: {
      type: String,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    startDate: {
      type: Date,
      required: false,
    },
    endDate: {
      type: Date,
      required: false,
    },
    isCurrent: {
      type: Boolean,
      default: false
    },
    isLocked: {
      type: Boolean,
      default: false
    },
    timestamp: {
      type: Date,
      default: moment().format()

    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  })
);

module.exports = TimePeriod;
