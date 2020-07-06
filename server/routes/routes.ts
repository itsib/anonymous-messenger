import * as express from 'express';
import { authRoutes } from './auth/auth.routes';

const routes = express.Router();

routes.use('/auth', authRoutes);

routes.use((req, res, next) => {
  res.status(404).json({ code: 404, message: 'errors.endpoint_not_supported' });
});

export {routes};

