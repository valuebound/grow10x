var express = require("express");
var router = express.Router();

const { getDashboardData, getDashboardDataCompanyWide } = require("./controller");
const { verifyToken, isActive } = require("../../middleware/authJwt");

router.get("/", [ verifyToken, isActive ], getDashboardData);
router.get("/company", [ verifyToken, isActive ], getDashboardDataCompanyWide);

module.exports = router;