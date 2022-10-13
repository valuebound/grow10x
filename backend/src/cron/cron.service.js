const cron = require('node-cron');
const Organization = require('../modules/organization/model');
const User = require('../modules/user/model');
const timePeriod = require('../modules/timeperiod/model');
const { getMonthNo } = require('../utility/helper');
const { sendEmail } = require("../utility/generateEmail");
const { weeklyReminderTemplate, weeklySummaryTemplate, 
    companyWeeklySummaryTemplate, createOkrReminderTemplate,
    companyTemplateNew } = require("../utility/generateTemplate");
const { customLogger } = require('../utility/logger');
const Okr = require('../modules/okr/model');
const moment = require('moment');
const {sum} = require('mathjs');
const { OKR_TYPES } = require('../utility/constants');
const checkin = require('../models/checkin.model');


const reminderCron = async() => {
    try {
        /**
         * Getting Org list
         */
        const getOrgList = await Organization.find({isDeleted: false});
        if (getOrgList || getOrgList >= 0){
            for ( let i=0; i<getOrgList.length; i++){
                /**
                 * Getting User List
                 */
                const getUserList = await User.find({ organization:getOrgList[i]._id, isDeleted: false, isActive:true});
                let dayfromDb = getOrgList[i]?.settings?.reminders?.day;
                let dayNo = await getMonthNo(dayfromDb);
                let time = getOrgList[i]?.settings?.reminders?.time;
                let splitTime = time.split(":");
                let hour = splitTime[0];
                let minute = splitTime[1];
                if(getUserList || getUserList.length>0){
                    for (let j=0; j<getUserList.length; j++){
                        /**
                         * Get OKR Data
                         */
                        const getOkrData = await Okr.find({ owner: getUserList[j]._id, isDeleted:false });
                        if ( getOkrData.length > 0 ){
                            cron.schedule(`${minute ? minute: '00'} ${hour ? hour : '10'} * * ${dayNo? dayNo:'1'}`, async() => {
                                const emailMessage = await weeklyReminderTemplate(getUserList[j])
                                await sendEmail(getUserList[j].email, `${getUserList[j].firstName}, Your OKR need an update `, emailMessage);
                            },
                            {
                                timezone: "Asia/Calcutta"
                            });
                        }
                        else if (getOkrData.length == 0) {
                            cron.schedule(`${minute ? minute: '00'} ${hour ? hour : '10'} * * ${dayNo? dayNo:'1'}`, async() => {
                                const emailMessage = await createOkrReminderTemplate(getUserList[j])
                                await sendEmail(getUserList[j].email, `${getUserList[j].firstName}, Please Create Your OKR`, emailMessage);
                            },
                            {
                                timezone: "Asia/Calcutta"
                            });
                            customLogger.log('warn', `No OKR Created by ${getUserList[j].firstName}`);
                        }  
                    }
                }
                else{
                    customLogger.log('info', 'No Users Exist');
                }
            }
        }
        else{
            customLogger.log('info', 'No Org Exist');
        }
    } catch (error) {
        customLogger.log('error', `Reminder Error - ${error}`);
    }
    
}

const IndividualWeeklySummaryCron = async() => {
    try {
        /**
         * Getting Org list
         */
        const getOrgList = await Organization.find({isDeleted: false});
        if (getOrgList || getOrgList >= 0){
            for ( let i=0; i<getOrgList.length; i++){
                /**
                 * get current quarter
                 */
                const getCurrentQuarter = await timePeriod.findOne({
                    organization: getOrgList[i]._id,
                    isCurrent: true,
                    isDeleted: false,
                },
                {
                    _id:1,
                    name:1,
                    startDate:1,
                    endDate:1,
                }).sort({timestamp: -1}); 

                if( getCurrentQuarter && getCurrentQuarter!== null ){
                    /**
                 * Getting User List
                 */
                const getUserList = await User.find({ organization:getOrgList[i]._id, isDeleted: false, isActive:true});
                let dayfromDb = getOrgList[i]?.settings?.weeklySummary?.day;
                let dayNo = await getMonthNo(dayfromDb);
                let time = getOrgList[i]?.settings?.weeklySummary?.time;
                let splitTime = time.split(":");
                let hour = splitTime[0];
                let minute = splitTime[1];
                if(getUserList || getUserList.length>0){
                    for (let j=0; j<getUserList.length; j++){
                        /**
                         * Get OKR Data
                         */
                        const getOkrData = await Okr.find({ owner: getUserList[j]._id,type: OKR_TYPES.INDIVIDUAL, isDeleted: false , quarter: getCurrentQuarter._id })
                        if ( getOkrData.length > 0 ){
                            let current_date, current_duration, end_date, expected_kr, start_date, total_duration;
                            start_date = moment(getCurrentQuarter.startDate).format("YYYY-MM-DD");
                            end_date = moment(getCurrentQuarter.endDate).format("YYYY-MM-DD");
                            current_date = moment().format("YYYY-MM-DD");

                            total_duration = moment(end_date).diff(moment(start_date), 'days');

                            current_duration = moment(current_date).diff(moment(start_date), 'days');
                            expected_kr = current_duration / total_duration * 100;
                            expected_kr = Math.round(expected_kr);

                            function get_status(current, expected) {
                                let v;
                                if (current === 100){
                                    return "Done"
                                }
                                else if (expected <= current) {

                                    return "On Track";
                                } else {
                                    if (expected > current) {
                                    v = expected - current;

                                    if (v > 15) {
                                        return "At Risk";
                                    } else {
                                        return "Behind";
                                    }
                                    }
                                }
                            }

                            function get_kr_status(current_value, start_value, target_value) {
                                let current_kr, status;
                                current_kr = (current_value - start_value) / (target_value - start_value) * 100;
                                current_kr = Math.round(current_kr);
                                status = get_status(current_kr, expected_kr);
                                return [status, current_kr];
                            }

                            function get_objective_status(data) {
                                let cur_obj, new_data, status;
                                new_data = [];
                                for (let j=0; j<data.length; j++){
                                    new_data.push(get_kr_status(data[j].currentValue, data[j].start, data[j].target)[1]);
                                }

                                cur_obj = sum(new_data) / new_data.length;
                                cur_obj = Math.round(cur_obj);
                                status = get_status(cur_obj, expected_kr);
                                return [cur_obj, status];
                            }

                            function get_overall_status(data) {
                                let cur_overall, new_data, status;
                                new_data = [];
                                for (let i = 0; i<data.length; i++) {
                                    new_data.push(get_objective_status(data[i].krs)[0]);
                                }
                                cur_overall = sum(new_data) / new_data.length;
                                cur_overall = Math.round(cur_overall);
                                status = get_status(cur_overall, expected_kr);
                                return [cur_overall, status];
                            }  
                            /**
                             * Cron Schedule
                             */
                            cron.schedule(`${minute ? minute: '00'} ${hour ? hour : '10'} * * ${dayNo? dayNo:'1'}`, async() => {
                                const newData = get_overall_status(getOkrData); 
                                const emailMessage = await weeklySummaryTemplate(getUserList[j], newData)
                                await sendEmail(getUserList[j].email, `${getUserList[j].firstName}, Your OKR Summary`, emailMessage);
                                customLogger.log('info', `Mail Sent to ${getUserList[j].email}`);
                            },
                            {
                                timezone: "Asia/Calcutta"
                            });
                        }                        
                    }
                }
                else{
                    customLogger.log('info', 'No Users Exist');
                }
                }
                else {
                    customLogger.log('warn', 'TimePeriod Doesnt Exist ');
                }
                
            }
        }
        else{
            customLogger.log('info', 'No Org Exist');
        } 
    } catch (error) {
        customLogger.log('error', `Weekly Summary Error - ${error.stack}`);
    }
};

const companyWeeklySummaryCron = async() => {
    try {
        /**
         * Getting Org list
         */
        const getOrgList = await Organization.find({isDeleted: false});
        if (getOrgList || getOrgList >= 0){
            for ( let i=0; i<getOrgList.length; i++){
                /**
                 * get current quarter
                 */
                const getCurrentQuarter = await timePeriod.findOne({
                    organization: getOrgList[i]._id,
                    isCurrent: true,
                    isDeleted: false,
                },
                {
                    _id:1,
                    name:1,
                    startDate:1,
                    endDate:1,
                }).sort({timestamp: -1}); 

                if (getCurrentQuarter && getCurrentQuarter !== null ){
                    /**
                 * Getting User List
                 */
                const getUserList = await User.find({ organization:getOrgList[i]._id, isDeleted: false, isActive:true})
                let dayfromDb = getOrgList[i]?.settings?.weeklySummary?.day;
                let dayNo = await getMonthNo(dayfromDb);
                let time = getOrgList[i]?.settings?.weeklySummary?.time;
                let splitTime = time.split(":");
                let hour = splitTime[0];
                let minute = splitTime[1];
                /**
                 * Get OKR Data
                 */
                const getOkrData = await Okr.find({ type: OKR_TYPES.COMPANY, isDeleted: false , quarter: getCurrentQuarter._id }).populate("owner", {organization:1});
                let companyBasedOKr= []
                for(let i=0; i<getOkrData.length; i++){
                    if (String(getOkrData[i].owner.organization) === String(getOrgList[i]._id)){
                        companyBasedOKr.push(getOkrData[i])
                    }
                }
                if ( getOkrData.length > 0 ){
                    let current_date, current_duration, end_date, expected_kr, start_date, total_duration;
                    start_date = moment(getCurrentQuarter.startDate).format("YYYY-MM-DD");
                    end_date = moment(getCurrentQuarter.endDate).format("YYYY-MM-DD");
                    current_date = moment().format("YYYY-MM-DD");

                    total_duration = moment(end_date).diff(moment(start_date), 'days');

                    current_duration = moment(current_date).diff(moment(start_date), 'days');
                    expected_kr = current_duration / total_duration * 100;
                    expected_kr = Math.round(expected_kr);

                    function get_status(current, expected) {
                        let v;
                        if (current === 100){
                            return "Done"
                        }
                        else if (expected <= current) {

                            return "On Track";
                        } else {
                            if (expected > current) {
                            v = expected - current;

                            if (v > 15) {
                                return "At Risk";
                            } else {
                                return "Behind";
                            }
                            }
                        }
                    }

                    function get_kr_status(current_value, start_value, target_value) {
                        let current_kr, status;
                        current_kr = (current_value - start_value) / (target_value - start_value) * 100;
                        current_kr = Math.round(current_kr);
                        status = get_status(current_kr, expected_kr);
                        return [status, current_kr];
                    }

                    function get_objective_status(data) {
                        let cur_obj, new_data, status;
                        new_data = [];
                        for (let j=0; j<data.length; j++){
                            new_data.push(get_kr_status(data[j].currentValue, data[j].start, data[j].target)[1]);
                        }

                        cur_obj = sum(new_data) / new_data.length;
                        cur_obj = Math.round(cur_obj);
                        status = get_status(cur_obj, expected_kr);
                        return [cur_obj, status];
                    }

                    function get_overall_status(data) {
                        let cur_overall, new_data, status;
                        new_data = [];
                        for (let i = 0; i<data.length; i++) {
                            new_data.push(get_objective_status(data[i].krs)[0]);
                        }
                        cur_overall = sum(new_data) / new_data.length;
                        cur_overall = Math.round(cur_overall);
                        status = get_status(cur_overall, expected_kr);
                        return [cur_overall, status];
                    }  
                    
                }    
                /**
                 * Cron Schedule
                 */
                cron.schedule(`${minute ? minute: '00'} ${hour ? hour : '10'} * * ${dayNo? dayNo:'1'}`, async() => {
                const newData = get_overall_status(companyBasedOKr); 
                if(getUserList || getUserList.length>0){
                    for (let j=0; j<getUserList.length; j++){
                        const emailMessage = await companyWeeklySummaryTemplate(getUserList[j], newData, getOrgList[i].orgName);
                        await sendEmail(getUserList[j].email, `${getOrgList[i].orgName}'s, OKR Summary`, emailMessage);
                        customLogger.log('info', `Mail Sent to ${getUserList[j].email}`);
                    }
                }
                else{
                    customLogger.log('info', 'No Users Exist');
                }
                },
                {
                    timezone: "Asia/Calcutta"
                }); 
                }
                else {
                    customLogger.log('warn', 'Time Period Doesnt Exist');
                }               
            }
        }
        else{
            customLogger.log('info', 'No Org Exist');
        } 
    } catch (error) {
        customLogger.log('error', `Weekly Summary Error - ${error.stack}`);
    }   
};

const companyWeeklyCron = async() => {
    try {
        /**
         * Getting Org list
         */
        const getOrgList = await Organization.find({isDeleted: false});
        if (getOrgList || getOrgList >= 0){
            for ( let i=0; i<getOrgList.length; i++){
                /**
                 * get current quarter
                 */
                const getCurrentQuarter = await timePeriod.findOne({
                    organization: getOrgList[i]._id,
                    isCurrent: true,
                    isDeleted: false,
                },
                {
                    _id:1,
                    name:1,
                    startDate:1,
                    endDate:1,
                }).sort({timestamp: -1}); 

                if (getCurrentQuarter && getCurrentQuarter !== null ){
                    /**
                 * Getting User List
                 */
                const getUserList = await User.find({ organization:getOrgList[i]._id, isDeleted: false, isActive:true})
                let dayfromDb = getOrgList[i]?.settings?.weeklySummary?.day;
                let dayNo = await getMonthNo(dayfromDb);
                let time = getOrgList[i]?.settings?.weeklySummary?.time;
                let splitTime = time.split(":");
                let hour = splitTime[0];
                let minute = splitTime[1];
                let current_date, current_duration, end_date, expected_kr, start_date, total_duration;
                    start_date = moment(getCurrentQuarter?.startDate).format("YYYY-MM-DD");
                    end_date = moment(getCurrentQuarter?.endDate).format("YYYY-MM-DD");
                    current_date = moment().format("YYYY-MM-DD");

                    total_duration = moment(end_date).diff(moment(start_date), 'days');

                    current_duration = moment(current_date).diff(moment(start_date), 'days');
                    expected_kr = current_duration / total_duration * 100;
                    expected_kr = Math.round(expected_kr);

                /**
                 * ***** Get Checkin Summary ******
                 */
                const getCheckinData = await checkin.findOne({ org: getOrgList[i]._id })
                let mailList = [];
                if(getUserList || getUserList.length>0){
                    for (let j=0; j<getUserList.length; j++){
                        mailList[j] = getUserList[j].email;
                    }
                }
                else{
                    customLogger.log('info', 'No Users Exist');
                }
                /**
                 * Cron Schedule
                 */
                cron.schedule(`${minute ? minute: '00'} ${hour ? hour : '10'} * * ${dayNo? dayNo:'1'}`, async() => {

                    const todaysDate = moment().utcOffset('+05:30').subtract(1,'d').format('LLLL');
                    const weekEndDateArray = todaysDate.split(",");
                    let sevenDaysAgo = moment().utcOffset('+05:30').subtract(7,'d').format('LLLL');
                    const sevenDaysAgoArray = sevenDaysAgo.split(",");
                    let checkinLength = getCheckinData?.checkin?.length;
                    console.log(checkinLength);
                    console.log(weekEndDateArray,sevenDaysAgoArray );
                    let emailtemp;
                    function get_status(current, expected) {
                        let v;
                        if (current === 100){
                            return "Done"
                        }
                        if (current === 0){
                            return "None"
                        }
                        else if (expected <= current) {

                            return "On Track";
                        } else {
                            if (expected > current) {
                            v = expected - current;
                            if (v > 15) {
                                return "At Risk";
                            } else {
                                return "Behind";
                            }
                            }
                        }
                    }
                    const companyName = getOrgList[i].orgName;
                    let template;
                    if ( checkinLength > 1){
                        const oldProgress = getCheckinData?.checkin[checkinLength - 2]?.progress;
                        const newProgress =  getCheckinData?.checkin[checkinLength - 1]?.progress;
                        const oldStatus = get_status(oldProgress);
                        const newStatus = get_status(newProgress);
                        template = await companyTemplateNew(oldProgress, newProgress, companyName, oldStatus, newStatus, sevenDaysAgoArray, weekEndDateArray );
                    }
                    else if ( checkinLength === 1) {
                        const oldProgress = 0
                        const newProgress =  getCheckinData?.checkin[checkinLength - 1]?.progress;
                        const oldStatus = get_status(oldProgress);
                        const newStatus = get_status(newProgress);
                        template = await companyTemplateNew(oldProgress, newProgress, companyName, oldStatus, newStatus, sevenDaysAgoArray, weekEndDateArray );

                    }
                    else if (checkinLength === 0 || checkinLength === undefined){
                        const oldProgress = 0
                        const newProgress = 0
                        const oldStatus = get_status(oldProgress);
                        const newStatus = get_status(newProgress);
                        template = await companyTemplateNew(oldProgress, newProgress, companyName, oldStatus, newStatus, sevenDaysAgoArray, weekEndDateArray );
                    }
                    
                    await sendEmail(mailList, `${companyName}'s, OKR Summary`, template);
                    customLogger.log('info', `Mail Sent to ${mailList}`);
            
                },
                {
                    timezone: "Asia/Calcutta"
                }); 
                }
                else {
                    customLogger.log('warn', 'Time Period Doesnt Exist');
                }               
            }
        }
        else{
            customLogger.log('info', 'No Org Exist');
        }
        
    } catch (error) {
        customLogger.log('error', `Weekly Summary Error - ${error.stack}`);
    }
}

module.exports = { reminderCron, IndividualWeeklySummaryCron , companyWeeklyCron};