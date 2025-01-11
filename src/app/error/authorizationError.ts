import AppError from './AppError';

class authorizationError extends AppError {
  constructor(message: string = 'You are not authorized') {
    super(message, 403);
  }
}

export default authorizationError;
