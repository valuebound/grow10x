var express = require("express");
var router = express.Router();
const { verifyToken, isAdmin, isActive } = require("../../middleware/authJwt");

const {
    createTeam,
    getTeams,
    getAllMembers,
    getTeamsList,
    updateTeam,
    deleteTeam,
    teamnNameAvailable,
} = require("./controller");

const { verifyTeamName } = require("../../middleware/verifyTeamName");

router.get(
    "/verify",
    [
        verifyToken,
        isAdmin,
    ],
    teamnNameAvailable
);

router.get(
    "/",
    [
        verifyToken,
    ],
    getTeams);

router.get(
    "/members",
    [
        verifyToken,
    ],
    getAllMembers);

router.get(
    "/teams",
    [
        verifyToken,
        isActive,
        isAdmin
    ],
    getTeamsList );

router.post(
    "/",
    [
        verifyToken,
        isAdmin,
        verifyTeamName
    ],
    createTeam);

router.put(
    "/update/:teamid",
    [
        verifyToken,
        isAdmin
    ],
    updateTeam );

router.delete(
    "/delete/:teamid",
    [
        verifyToken,
        isAdmin
    ],
    deleteTeam );

module.exports = router;
