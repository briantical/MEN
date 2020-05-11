import { Router as router } from 'express';
import { authenticate, generateAccessToken } from '../../middleware';
import passport from 'passport';
import signIn from './sign-in';
import signUp from './sign-up';
import signOut from './sign-out';
import changePassword from './change-password';

/**
 * Provide Api for Auth

 POST /api/v1/auth/sign-in - Sign In
 @params
       email {string}
       password {string}

 POST /api/v1/auth/sign-up - Sign Un
 @params
       email {string}
       password {string}

 POST /api/v1/auth/sign-out - Sign Out
 @header
        Authorization: Bearer {token}

 POST /api/v1/auth/change-password - Change Password
 @header
       Authorization: Bearer {token}
 @params
       newPassword {string}
       password {string}


 **/

export = (models: any) => {
  const api = router();

  api.post('/sign-in', passport.authenticate('local', { session: false, scope: [] }), generateAccessToken, signIn);

  api.post(
    '/sign-up',
    signUp(models),
    passport.authenticate('local', { session: false, scope: [] }),
    generateAccessToken,
    signIn
  );

  api.post('/sign-out', authenticate, signOut);

  api.put('/change-password', authenticate, changePassword(models));

  return api;
};
