import AppError from './AppError';

class authorizationError extends AppError {
  constructor(message: string = 'You are not authorized') {
    super(403, message);
  }
}

export default authorizationError;
