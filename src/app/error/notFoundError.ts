import AppError from './AppError';

class notFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(404, message);
  }
}

export default notFoundError;
