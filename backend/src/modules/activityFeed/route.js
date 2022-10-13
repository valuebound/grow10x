var express = require("express");
var router = express.Router();

const { verifyToken, isActive } = require("../../middleware/authJwt");
const { getMyActivityFeed } = require("./controller");

router.get("/:id", [verifyToken, isActive,], getMyActivityFeed);

module.exports = router;