const mongoose = require("mongoose");
const { ACTIVITY_STATUS_ARRAY, KR_OPERATIONS_ARRAY } = require("../../utility/constants");
const moment = require('moment');

const ActivityFeed = mongoose.model(
  "ActivityFeed",
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    id: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: moment().format(),
    },
    status: {
      type: String,
      enum: ACTIVITY_STATUS_ARRAY,
    },
    activity: [{
      prevData: {
        type: {},
      },
      newData: {
        type: {},
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      operation:{
        type: String,
        enum: KR_OPERATIONS_ARRAY,
      },
      timestamp: {
        type: Date,
        default: moment().format(),
      }
    }]
  })
);

module.exports = ActivityFeed;
