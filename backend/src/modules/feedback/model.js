const mongoose = require("mongoose");

const Feedback = mongoose.model(
  "Feedback",
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userRating: {
      type: Number,
      required: false,
    },
    managerRating: {
      type: Number, required: false
    },
    finalRating: {
      type: Number, required: false
    },
    comments: [
      {
        type: String,
        required: false,
      },
    ],
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    userFeedbackOkrs: new mongoose.Schema(
      {
        okr: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Okr'
        },
        rating: {
          type: Number
        },
        comments: {
          type: String, required: true
        }
      }
    ),
    managerFeedbackOkrs: new mongoose.Schema(
      {
        okr: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Okr'
        },
        rating: {
          type: Number
        },
        comments: {
          type: String, required: true
        }
      }
    ),
    quarter: {
      type: String,
      required: false,
    },
    year: {
      type: String,
      required: false,
    },
    projectLead: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    projectFeedback: {
      type: String,
      required: false,
    },

  })
);

module.exports = Feedback;
