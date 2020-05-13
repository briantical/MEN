const express = require('express');

import { errorHandler } from '../middleware';
import { Image } from '../models/image';
import { User } from '../models/user';
import { Car } from '../models/car';

import auth from '../controllers/auth';
import images from '../controllers/images';
import users from '../controllers/users';
import cars from '../controllers/cars';

const models = { User, Car, Image };

const routersInit = (config: any) => {
  const router = express();

  router.use('/auth', auth(models));
  router.use('/users', users(models));
  router.use('/cars', cars(models, { config }));
  router.use('/images', images(models));

  router.use(errorHandler);
  return router;
};

export default routersInit;
