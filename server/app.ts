import * as express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const PORT = process.env.PORT || 4444;

const app = express();

app.get('/api', (req, res) => {
  res.send('Hello World!!');
});

if (process.env.NODE_ENV !== 'production') {
  app.use('/', createProxyMiddleware({target: 'http://localhost:4445', changeOrigin: true, ws: true}));
} else {
  app.use('/', express.static('../front'));
}

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
