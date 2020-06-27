import * as express from 'express';
import { Server } from 'http';
import { Socket } from 'socket.io';
import * as socketio from 'socket.io';
import { createProxyMiddleware } from 'http-proxy-middleware';

const PORT = process.env.PORT || 4444;
const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use('/', createProxyMiddleware({target: 'http://localhost:4445', changeOrigin: true, ws: true}));
} else {
  app.use('/', express.static('../front'));
}

const server: Server = app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
const io = socketio(server);

io.on('connection', (socket: Socket) => {
  console.log('Socket connected');
});
