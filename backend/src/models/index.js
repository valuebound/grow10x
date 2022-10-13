const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("../modules/user/model");
db.feedback = require("../modules/feedback/model")
db.okr = require("../modules/okr/model");
db.organization = require("../modules/organization/model");
db.team = require("../modules/team/model");
db.userType = require("../modules/userType/model");
db.timePeriod = require("../modules/timeperiod/model");
db.activityFeed = require("../modules/activityFeed/model");
db.checkin = require("./checkin.model");

module.exports = db;
