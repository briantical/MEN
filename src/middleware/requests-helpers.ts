import { curry } from 'lodash';
const { NotFoundError } = require('rest-api-errors');

const STATUSES = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502
};

export const sendResponse = (res: any, data: any, status = STATUSES.SUCCESS) => res.status(status).json(data).end();

export const withoutErrors = (next: (arg0: any) => any, callback: (arg0: any) => any) => (
  err: any,
  updatedTank: any
) => {
  if (err) {
    return next(err);
  }
  return callback && callback(updatedTank);
};

export const sendOne = curry((res: any, entity: any) => {
  if (!entity) {
    throw new NotFoundError();
  }

  return sendResponse(res, entity);
});

export const sendList = curry((res: any, entityList: any) => sendResponse(res, entityList));
export const sendCreated = curry((res: any, entity: any) => sendResponse(res, entity));
export const sendUpdated = curry((res: any, updatedEntity: any) => sendResponse(res, updatedEntity));
export const sendDeleted = curry((res) => sendResponse(res, null, STATUSES.NO_CONTENT));
export const sendAccepted = (res: any) => () => sendResponse(res, null);
