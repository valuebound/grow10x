const express = require("express");
const router = express.Router();

const { createfeedback, getfeedback, updatefeedback } = require("./controller");
const { verifyToken, verifyOrg } = require("../../middleware/authJwt");

router.post("/:orgid/:userid/", [verifyToken, verifyOrg], createfeedback);
router.put("/:orgid/:feedbackid/", [verifyToken, verifyOrg], updatefeedback);
router.get("/:orgid/feeds",[verifyToken, verifyOrg], getfeedback);

module.exports = router;
