import AppError from './AppError';

class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication Failed') {
    super(401, message);
  }
}

export default AuthenticationError;
