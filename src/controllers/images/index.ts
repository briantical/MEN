const { Router: router } = require('express');
const { authenticate } = require('../../middleware');
const get = require('./get');

/**
 * Provide Api for Images

 GET /api/v1/images/:_id - Get Image
 @header
        Authorization: Bearer {token}
 **/

export = (models: any) => {
  const api = router();

  api.get('/:_id', authenticate, get(models));

  return api;
};
