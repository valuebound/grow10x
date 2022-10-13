const mongoose = require("mongoose");
const moment = require('moment');

const Checkin = mongoose.model(
  "CheckIn",
  new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    org: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
    },
    quarter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quarter",
    },
    checkin:[{
        checkinDate: {
            type: String,
        },
        progress: {
            type: Number,
        }
    }],
  })
);

module.exports = Checkin;
