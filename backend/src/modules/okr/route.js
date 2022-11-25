var express = require("express");
var router = express.Router();
const { verifyToken, isActive } = require("../../middleware/authJwt");

const {
  createOkr,
  getMyAllOkrs,
  updateOkr,
  addNewKrs,
  deleteKr,
  deleteOKR,
  getSingleOKr,
  checkInAndAddComment,
  updateComment,
  addComment,
  checkInSummary,
  checkInCompanySummary,
  searchOkrByUser,
} = require("./controller");

router.post("/", [verifyToken, isActive], createOkr);
router.get("/", [verifyToken, isActive], getMyAllOkrs);
router.get("/:okrid", [verifyToken, isActive], getSingleOKr);
router.put("/checkin/:krid/",[verifyToken, isActive], checkInAndAddComment);
router.patch("/updatecomment/:krid/",[verifyToken, isActive], updateComment);
router.put("/:okrid", [verifyToken, isActive], updateOkr);
router.put("/addkrs/:okrid",[verifyToken, isActive], addNewKrs);
router.delete("/deleteokr/:okrid",[verifyToken, isActive], deleteOKR);
router.delete("/deletekr/:okrid/:krsid",[verifyToken, isActive], deleteKr);
router.patch("/addcomment/:krid",[verifyToken, isActive], addComment);
router.get("/checkin/summary", [verifyToken, isActive], checkInSummary);
router.get("/checkin/company/summary", [verifyToken, isActive], checkInCompanySummary);
router.post("/search", [verifyToken], searchOkrByUser);

module.exports = router;
