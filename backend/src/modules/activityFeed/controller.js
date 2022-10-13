const activityFeed = require("./model");
const { customResponse,} = require("../../utility/helper");
const { HTTP_CODES, } = require("../../utility/constants");
const { customLogger } = require("../../utility/logger");
const User = require("../user/model");
const sanitizer = require("sanitize")();

const getMyActivityFeed = async (req, res) => {
    try {
        const _id = req.userId;
        const user = await User.findById(_id);
        const orgId = user.organization;
        const id = sanitizer.value(req.params.id, 'str');
        const getActivityFeedData = await activityFeed.findOne(
        {
            organization: orgId,
            id: id
        },
        {
            __v:0,
        }).populate("user", {_id:1,firstName:1, surname:1, avatar:1})
        .populate("activity.createdBy", {_id:1,firstName:1, surname:1, avatar:1 });

        const reverseActivity = getActivityFeedData.activity.reverse();
        getActivityFeedData.activity = reverseActivity;

        customLogger.log('info', 'Success Get Activity Feed');
        const resData = customResponse({
        code: HTTP_CODES.SUCCESS,
        message: "Successfully Fetch Activity Feed",
        data: getActivityFeedData
        });
        return res.status(HTTP_CODES.SUCCESS).send(resData);
    } catch (error) {
        customLogger.log('error', `${error}`);
        if (error.kind === 'ObjectId'){
            const resData = customResponse({
              code: HTTP_CODES.BAD_REQUEST,
              message: "Invalid timeperiod id Provided",
              err: {},
            });
            return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
        }
        const resData = customResponse({
        code: HTTP_CODES.BAD_REQUEST,
        message: "Failed to Get Activity Feed.",
        err: {}
        });
        return res.status(HTTP_CODES.BAD_REQUEST).send(resData);
    }
    }

module.exports = {
getMyActivityFeed,
};