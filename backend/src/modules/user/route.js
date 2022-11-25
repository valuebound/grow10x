var express = require("express");
var router = express.Router();

const {
    getReportingManagerList,
    addUser,
    getUsersRoleBased,
    setPassword,
    resetPassword,
    inactiveUser,
    updateUserProfile,
    updateUserProfileByAdmin,
    verifyOtp,
    changePassword,
    userSearchbyName,
    myDetails,
    createUserWhileImport,
    activateUser,
    searchByName,
} = require("./controller");
const { verifyToken, isAdmin, isActive } = require("../../middleware/authJwt");
const uploadFile = require("../../middleware/upload");
const { verifyEmail } = require("../../middleware/verifyUserSignup");

/**
 * Forgot Password
 */
router.get("/forgot", resetPassword);

/**
 * Verify OTP
 */
router.post("/verifyotp", verifyOtp);

/**
 * Fet User List (Self Org)
 */
router.get("/reporting-manager-list",[verifyToken, isActive, isAdmin], getReportingManagerList);

/**
 * Search Feature for inactive or active user with user's okr stats.
 */
router.get("/searchuser",[verifyToken, isActive], userSearchbyName);

/**
 * Get Users Role
 */
router.get(
  "/getusers",
  [verifyToken, isActive, isAdmin],
  getUsersRoleBased
);

/**
 * Get User Details (Self Profile)
 */
router.get(
  "/my-profile",
  [verifyToken, isActive],
  myDetails
)

/**
 * Create or Add New User
 */
router.post(
  "/",
  [
    verifyToken, isActive,
    isAdmin,
    verifyEmail,
  ],
  addUser
);

/**
 * Reset Password
 */
router.put("/:userid/setpassword", setPassword);

/**
 * Update User Profile (Self)
 */
router.put(
  "/update/:userid",
  [verifyToken, isActive],
  updateUserProfile
);

/**
 * Update User Profile (By Admin)
 */
router.put(
  "/admin/update/:userid",
  [verifyToken, isActive, isAdmin],
  updateUserProfileByAdmin
);

/**
 * Change Password
 */
router.put("/changepassword",[verifyToken, isActive], changePassword);

/**
 * Delete User (By Admin)
 */
router.patch(
  "/inactive/:userid",
  [verifyToken, isActive, isAdmin],
  inactiveUser
);

/**
 *
 */
router.patch(
  "/active/:userid",
  [verifyToken, isActive, isAdmin],
  activateUser
);

/**
 * Import Bulk users from excel
 */
router.post(
  "/import-users",
  [verifyToken, isActive, isAdmin ,uploadFile.single("file")],
  createUserWhileImport
);

/**
 * User search by name (for adding parent OKR)
 */
router.post("/search", [verifyToken, isActive], searchByName);

module.exports = router;
