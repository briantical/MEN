//logger
import winston from 'winston';
import 'winston-mongodb';

const transports: any = winston.transports;

import { mongoManager } from './src/mongo';

const logger = winston.createLogger({
  transports: [new transports.MongoDB({ db: mongoManager.getMongoUrl() })]
});

export default logger;
