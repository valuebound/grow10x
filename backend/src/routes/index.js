var express = require("express");
var router = express.Router();

const userRoutes = require("../modules/user/route");
const typeRoutes = require("../modules/userType/route");
const organizationRoutes = require("../modules/organization/route");
const okrRoutes = require("../modules/okr/route");
const authRoutes = require("./auth");
const feedbackRoutes = require("../modules/feedback/route");
const teamRoutes = require("../modules/team/route");
const dashboardRoutes = require("../modules/dashboard/route");
const timePeriodRoutes = require("../modules/timeperiod/route");
const activityFeedRoutes = require("../modules/activityFeed/route");
const morgan = require('morgan');
const morganTiny = morgan('tiny');
/**
 * Auth Routes
 */
router.use("/auth", morganTiny, authRoutes);

router.use("/user-types", morganTiny, typeRoutes);
router.use("/user", morganTiny, userRoutes);
router.use("/myorganization", morganTiny, organizationRoutes);
router.use("/okr", morganTiny, okrRoutes);
router.use("/feedback", morganTiny, feedbackRoutes);
router.use("/team", morganTiny, teamRoutes);
router.use("/dashboard", morganTiny, dashboardRoutes);
router.use("/timeperiod", morganTiny, timePeriodRoutes);
router.use("/activityfeed", morganTiny, activityFeedRoutes);

router.get("/health-check", morganTiny ,(req, res) => {
    const healthcheck = {
      uptime: process.uptime(),
      message: "Ok",
      timestamp: Date.now(),
    };
    res.send(healthcheck);
  });

module.exports = router;
