var express = require("express");
var router = express.Router();
const {
    getAllUsersAccount,
    updateMyOrg,
    getMyOrgProfile,
    orgChart,
    getCompanyDetails,
    updateCompanyDetails,
    updateCompanyLogo,
    deleteCompanyLogo,
    orgChartListView,
} = require('./controller');
const { verifyToken,verifyOrg ,isAdmin, isSuperAdmin, isActive } = require("../../middleware/authJwt");
const uploadFile = require("../../middleware/logoUpload");

router.get("/employees",[verifyToken, isActive] ,getAllUsersAccount);
router.patch("/:orgid/update", [verifyToken, isActive, verifyOrg, isAdmin], updateMyOrg);
router.get("/profile", [verifyToken, isActive, isAdmin], getMyOrgProfile);
router.get("/org-chart",[verifyToken, isActive], orgChart);
router.get("/orgchart-list",[verifyToken, isActive], orgChartListView);
router.get("/company/details", [verifyToken, isActive], getCompanyDetails);
router.patch("/company/updatedetails", [verifyToken, isActive, isAdmin], updateCompanyDetails);
router.put("/logo",[verifyToken, isAdmin, uploadFile.single("image")], updateCompanyLogo);
router.delete("/logo/:filename",[verifyToken, isAdmin], deleteCompanyLogo);

module.exports = router;
