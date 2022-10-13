const mongoose = require("mongoose");
const moment = require('moment');

const Team = mongoose.model(
  "Team",
  new mongoose.Schema({
    teamName: {
      type: String,
      required: true,
    },
    lead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    parent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    createdDate: {
      type: Date,
      default: moment().format(),
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    }
  })
);

module.exports = Team;
