const { customLogger } = require("./utility/logger");
const { initateCronService } = require('./cron');
const { env } = require('./config/environment');
const config = require(`./config/${env}.config`);
const port = config.PORT || 4000;
const {createServer} = require('./utility/server');

const app = createServer();

app.listen(port, () => {
  customLogger.log('info', 'Grow10x Portal by Valuebound.');
  customLogger.log('info', `app listening on port ${port}`);
});

/** initateCronService(); */

module.exports = app;
