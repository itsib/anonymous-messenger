import * as express from 'express';
import { Server } from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';
import * as mongoose from 'mongoose';
import * as socketio from 'socket.io';
import { config } from './config';
import { routes } from './routes/routes';
import { connectionHandler } from './socket/socket';
import * as bodyParser from 'body-parser';
import * as jwt from 'jsonwebtoken';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Add api routes
app.use('/api', routes);

if (config.nodeEnv !== 'production') {
  app.use('/', createProxyMiddleware(pathname => !/^\/socket/.test(pathname), {
    target: config.frontUrl,
    changeOrigin: true,
    logLevel: 'error',
    ws: true,
  }));
} else {
  app.use('/', express.static('../front'));
}

// Connect to database
mongoose.connect(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Mongo is connected...');

  // Crete web server
  const server: Server = app.listen(config.port, () => {
    console.log(`Server is running in http://localhost:${config.port}`);
  });

  // Crete socket server
  const io: socketio.Server = socketio(server, { path: '/socket' });

  // Check authorization
  io.use(function(socket, next) {
    const token = socket.handshake.query.token;

    try {
      const payload = jwt.verify(token, config.secret) as {_id: string};
      socket.handshake['userId'] = payload._id;
    } catch (e) {
      return next(new Error('not_authorized'));
    }

    return next();
  });

  io.on('connection', connectionHandler);
});


