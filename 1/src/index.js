import http from 'node:http';
import { routes } from './routes'

const server = http.createServer((req, res) => {
  const [ , resource, subResource ] = req.url.split('/');

  const route = routes.find((route) => route.path === resource)

  if (!route) {
    res.writeHead(404).end('Not found');
  }

  route.controller(req, res, subResource || null);
});

server.listen(3000, () => {
  console.log('🚀  http://localhost:3000');
});