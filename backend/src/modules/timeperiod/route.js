var express = require("express");
var router = express.Router();

const { verifyToken,isActive, isAdmin} = require("../../middleware/authJwt");
const { createTimePeriod, updateTimePeriod, getAllTimePeriod, deleteTimePeriod } = require("./controller");
const { verifytimePeriod } = require("../../middleware/verifyTimePeriod");

router.get("/",[verifyToken, isActive], getAllTimePeriod);
router.post("/create",[verifyToken, isActive, isAdmin, verifytimePeriod], createTimePeriod);
router.patch("/update/:timeperiodid",[verifyToken, isActive, isAdmin], updateTimePeriod);
router.delete("/delete/:timeperiodid",[verifyToken, isActive, isAdmin], deleteTimePeriod);

module.exports = router;
