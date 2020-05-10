"use strict";
const winston = require('winston');
require('winston-mongodb');
const { mongoManager } = require('./src/mongo/MongoManager');
const logger = winston.createLogger({
    transports: [new winston.transports.MongoDB({ db: mongoManager.getMongoUrl() })]
});
module.exports = logger;
