const { createLogger, transports, format } = require("winston");
const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp}) => {
    return `${timestamp} [${level}]: ${message}`;
});

const customLogger = createLogger({
    level: 'debug',
    format: combine(
        colorize(),
        timestamp({format:"YYYY-MM-DD HH:mm:ss"}),
        format.errors({ stack: true }),
        myFormat
    ),
    transports: [
        new transports.Console(),
    ]
});

module.exports = { customLogger };