import express, { Application, Request, Response } from 'express';
import sendResponse from './app/utils/sendResponse';
import router from './app/routes';
import notFound from './app/middleware/notFound';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// Routes
app.use('/api', router);

app.get('/', (_req: Request, res: Response) => {
  sendResponse(res, {
    success: true,
    message: 'Welcome to Blog Project Backend',
    statusCode: 200,
  });
});

// Global error handler
app.use(globalErrorHandler);

// 404 handler
app.use(notFound);

export default app;
