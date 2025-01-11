import AppError from './AppError';

class notFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export default notFoundError;
