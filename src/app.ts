import express, { Application, Request, Response } from 'express';
import sendResponse from './app/utils/sendResponse';
import router from './app/routes';
import notFound from './app/middleware/notFound';
import globalErrorHandler from './app/middleware/globalErrorHandler';

const app: Application = express();

app.use(express.json());

app.use('/api', router);

app.get('/', (_req: Request, res: Response) => {
  sendResponse(res, {
    success: true,
    message: 'Welcome to Blog Project Backend',
    statusCode: 200,
    data: {},
  });
});

app.use(notFound);

app.use(globalErrorHandler);

export default app;
