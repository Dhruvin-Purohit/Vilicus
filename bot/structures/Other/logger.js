const winston = require('winston')

module.exports = winston.createLogger(
    {
        format: winston.format.json(),
        transports: [
            new winston.transports.Console({ level: 'silly',  format: winston.format.cli() }),
            new winston.transports.File({ filename: 'error.log', level: 'warn', format: winston.format.prettyPrint() }),
            new winston.transports.File({ filename: 'every.log', level: 'silly', format: winston.format.prettyPrint() })
          ]
    }
)
