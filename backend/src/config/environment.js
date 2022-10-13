const logger = require("../utility/logger");

require('dotenv').config({path:__dirname+'/./../../.env'});
const env = process.env.NODE_ENV;

if(env == undefined){
    logger.customLogger.log('info','--------------Environment File Missing---------------');
    logger.customLogger.log('info',`.env file is missing...`);
    logger.customLogger.log('info','-----------------------------------------------------');
    process.exit(1);
}
else if(env == 'production' || env == 'development' || env == 'local' || env == 'qa'){
    logger.customLogger.log('info','--------------------------------------');
    logger.customLogger.log('info',`Running on ${process.env.NODE_ENV} environment...`);
    logger.customLogger.log('info','--------------------------------------');
    const configFile = `./config/${env}.config.js`;
    module.exports.env = env;
    module.exports.configFile = configFile;
}
else{
    logger.customLogger.log('info','----------Unknown Environment------------');
    logger.customLogger.log('info',`Only support production, development or local environment.. NOT ${env} environment`);
    logger.customLogger.log('info','-----------------------------------------');
    process.exit(1);
}
