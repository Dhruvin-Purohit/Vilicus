const winston = require('winston')

module.exports = winston.createLogger(
    {
        format: winston.format.json(),
        transports: [
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            new winston.transports.File({ filename: 'every.log' }),
          ]
    }
)

logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
