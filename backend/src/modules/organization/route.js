var express = require("express");
var router = express.Router();
const {
    getAllUsersAccount,
    updateMyOrg,
    getMyOrgProfile,
    orgChart,
    getCompanyDetails,
    updateCompanyDetails,
} = require('./controller');
const { verifyToken,verifyOrg ,isAdmin, isSuperAdmin, isActive } = require("../../middleware/authJwt");

router.get("/employees",[verifyToken, isActive] ,getAllUsersAccount);
router.patch("/:orgid/update", [verifyToken, isActive, verifyOrg, isAdmin], updateMyOrg);
router.get("/profile", [verifyToken, isActive, isAdmin], getMyOrgProfile);
router.get("/org-chart",[verifyToken, isActive], orgChart);
router.get("/company/details", [verifyToken, isActive], getCompanyDetails);
router.patch("/company/updatedetails", [verifyToken, isActive, isAdmin], updateCompanyDetails);

module.exports = router;
