import AppError from './AppError';

class authenticationError extends AppError {
  constructor(message: string = 'Authenticaton Failed') {
    super(message, 401);
  }
}

export default authenticationError;
