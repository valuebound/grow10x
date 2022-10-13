const mongoose = require("mongoose");
const { OKR_TYPES_ARRAY, UNIT_TYPES_ARRAY } = require("../../utility/constants");
const moment = require('moment');

const Okr = mongoose.model(
  "Okr",
  new mongoose.Schema({
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Okr",
    },
    objective: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: { values: OKR_TYPES_ARRAY },
      required: true,
    },
    krs: [
      {
        keyResult: {
          type: String,
        },
        target: {
          type: Number,
        },
        start: {
          type: Number,
          defualt: 0,
        },
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        currentValue: {
          type: Number,
          default: 0,
        },
        isDeleted: {
          type: Boolean,
          default: false,
        },
        isBoolean: {
          type: Boolean,
          default: false,
        },
        unit: {
          type: String,
          enum: { values: UNIT_TYPES_ARRAY },
        },
        comment: [
          {
            text: {
              type: String
            },
            commentedBy: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            createdAt: {
              type: Date,
              default: moment().format(),
            },
          },
        ],
      },
    ],
    quarter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimePeriod",
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: moment().format(),
    },
    updatedAt: {
      type: Date,
      default: moment().format(),
    }
  })
);

module.exports = Okr;
