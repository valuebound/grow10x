const mongoose = require("mongoose");

const UserType = mongoose.model(
  "UserType",
  new mongoose.Schema({
    role: {
      type: String,
      required: true,
      unique: true,
    },
    permission: {
      type: [String],
      required: true,
    },
  })
);

module.exports = UserType;
