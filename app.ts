import express from 'express';
import path from 'path';
import logger from 'morgan';
import fs from 'fs';
import cookieParser from 'cookie-parser';

import { config } from 'dotenv';
config();

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import swaggerMerger from 'swagger-merger';

import bodyParser from 'body-parser';
import myconfig from './config';

import api from './src/api';
import { passport } from './src/passport';
import { mongoManager } from './src/mongo';

const app = express();
mongoManager.connect();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// middleware
app.use(
  bodyParser.json({
    limit: myconfig.config.bodyLimit
  })
);

// Authorization
app.use(passport.init());

// api routes v1
app.use('/api/v1', api(myconfig));

// register api doc
const outputSwaggerDir = path.resolve(myconfig.config.swaggerDirPath, './build');
const swaggerBuildFilePath = path.resolve(outputSwaggerDir, './swagger.yaml');

if (!fs.existsSync(outputSwaggerDir)) {
  fs.mkdirSync(outputSwaggerDir);
}
swaggerMerger({ input: myconfig.config.swaggerFilePath, output: swaggerBuildFilePath });
const swaggerDocument = YAML.load(swaggerBuildFilePath);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
