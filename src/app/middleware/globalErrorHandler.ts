/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { TErrorSources } from '../interface/error';
import { ZodError } from 'zod';
import handleZodError from '../error/handleZodError';
import handleValidationError from '../error/handleValidationError';
import AppError from '../error/AppError';
import config from '../config';
import notFoundError from '../error/notFoundError';
import authenticationError from '../error/authenticationError';
import authorizationError from '../error/authorizationError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simlifiedError = handleZodError(err);
    statusCode = simlifiedError?.statusCode;
    message = simlifiedError?.message;
    errorSources = simlifiedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simlifiedError = handleValidationError(err);
    statusCode = simlifiedError?.statusCode;
    message = simlifiedError?.message;
    errorSources = simlifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof notFoundError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err instanceof authenticationError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err instanceof authorizationError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else {
    message = err?.message || 'Internal Server Error';
    errorSources = [
      {
        path: '',
        message: err?.message || 'An unexpected error occured',
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
  
  next();
};

export default globalErrorHandler;
