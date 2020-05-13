const { APIError, InternalServerError } = require('rest-api-errors');
const { STATUS_CODES } = require('http');
import logger from '../../logger';

// eslint-disable-next-line
const errorHandler = (
  err: any,
  req: any,
  res: {
    status: (arg0: number) => { (): any; new (): any; json: { (arg0: { code: any; message: any }): any; new (): any } };
  },
  next: any
) => {
  const error = err.status === 401 || err instanceof APIError ? err : new InternalServerError();
  console.log(req);
  console.log(next);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line
    console.log('-----> Unknown server error...');
    // todo: comment here for production
    // eslint-disable-next-line
    console.log('Error Handler: ' + err);
  }

  if (['UserExistsError', 'ValidationError'].includes(err.name)) {
    return res.status(405).json(err);
  }

  logger.info('API error', { error: err });

  return res.status(error.status || 500).json({
    code: error.code || 500,
    message: error.message || STATUS_CODES[error.status]
  });
};

export default errorHandler;
