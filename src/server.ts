import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { ConfigService } from './config/dotenv.config';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import * as routes from './routes/utils/index';
import errorHandler from './middleware/error-handler';

const app = express();

const configService = ConfigService.getInstance();

console.log(`Connecting to ${configService.get('MONGO_URL')}`);
mongoose
  .connect(configService.get('MONGO_URL'))
  .then(() => {
    console.info('Connected to mongoDB');
    StartServer();
  })
  .catch((error: any) => {
    console.error('Unable to connect: ');
    console.error(error);
  });

const StartServer = () => {
  console.log(`Starting server...`);
  console.log(`NODE_ENV:`, configService.get('NODE_ENV'));

  const corsOptions = {
    origin: '*',
    credentials: true,
  };

  if (configService.get('NODE_ENV') === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined'));
  }

  app.use(cors(corsOptions));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(compression());
  app.use(cookieParser());

  /**Routes */
  app.use('/api/v1/user', routes.userRoutes);
  app.use('/api/v1/something', routes.somethingRoutes);

  /**Healthcheck */
  app.get('/api/v1/ping', (req, res) => res.status(200).json({ message: 'pong' }));

  /** Error handling */
  app.use(errorHandler);

  http
    .createServer(app)
    .listen(configService.get('SERVER_PORT'), () =>
      console.info(`Server running on port ${configService.get('SERVER_PORT')}`),
    );
};
