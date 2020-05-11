import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

import config from '../../config';

export const authenticate = (req: any, res: any, next: any) => {
  req.headers.authorization = req.headers.authorization || `Bearer ${req.query.access_token}`;
  return expressJwt({ secret: config.config.passport.secretAuthToken })(req, res, next);
};

export const generateAccessToken = (req: any, res: any, next: () => void) => {
  req.token = req.token || {};
  req.token = jwt.sign(
    {
      id: req.user.id
    },
    config.config.passport.secretAuthToken,
    {
      expiresIn: config.config.passport.tokenTime
    }
  );
  next();
};
