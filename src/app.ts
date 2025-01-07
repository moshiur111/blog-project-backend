import express, { Application, Request, Response } from 'express';

const app: Application = express();

const PORT = 3000;

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Blog Project Backend!',
  });
});

export default app;
