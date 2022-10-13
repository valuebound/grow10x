var express = require("express");
var router = express.Router();

const { addRole, getRole } = require("./controller");
const { verifyToken,isActive, isAdmin} = require("../../middleware/authJwt");

router.post("/", addRole);
router.get("/roles",[verifyToken, isActive, isAdmin], getRole);

module.exports = router;
