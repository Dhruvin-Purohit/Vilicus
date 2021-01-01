const winston = require('winston')

module.exports = winston.createLogger(
    {
        format: winston.format.json(),
        transports: [
            new winston.transports.File({ filename: 'error.log', level: 'warn' }),
            new winston.transports.File({ filename: 'every.log', level: 'silly' }),
            //new winston.transports.Console({ format: winston.format.colorize })
          ]
    }
)
