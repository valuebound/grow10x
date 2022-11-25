var express = require("express");
var router = express.Router();

const { verifyToken, isSuperAdmin, verifyRefreshToken, verifyLogOut, isActive } = require("../middleware/authJwt");
const { login, logout , refreshToken , getLoggedinDetails } = require("../modules/user/controller");
const { verifyOrgEmail, verifyOrgName, verifyOrgPhone, verifyOrgUsername } = require("../middleware/verifyOrgSignup");
const { 
  createOrganizationAccount, 
  getOrganizationList, 
  deleteOrg, 
  updateMyOrg ,
  updateCompanyLogo,
  deleteCompanyLogo,
} = require("../modules/organization/controller");
const uploadFile = require("../middleware/logoUpload");

router.get("/logout", [verifyLogOut], logout);
router.get("/refresh-token",[verifyRefreshToken], refreshToken);

/**
 * Org Signup
 */
router.post(
    "/orgsignup",
    [
      verifyOrgEmail,
      verifyOrgName,
      verifyOrgPhone,
      verifyOrgUsername,
      verifyToken,
      isActive,
      isSuperAdmin,
    ],
    createOrganizationAccount
  );
  /**
   * Getting List of Registered Organizations
   */ 
  router.get("/orglist",[verifyToken, isActive, isSuperAdmin], getOrganizationList);

  router.post("/login", login);
  router.get("/user-details", [verifyToken, isActive] , getLoggedinDetails);
  router.delete("/delete/:orgid", [verifyToken, isActive, isSuperAdmin], deleteOrg);
  router.put('/update/org/:orgid', [verifyToken, isActive, isSuperAdmin], updateMyOrg);
  router.put('/update/logo/:orgid', [verifyToken, isActive, isSuperAdmin, uploadFile.single('image')], updateCompanyLogo);
  router.delete('/delete/logo/:orgid/:filename', [verifyToken, isActive, isSuperAdmin], deleteCompanyLogo);

module.exports = router;