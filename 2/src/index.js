import http from 'http';
import {parse} from "url";

import Router from "./services/router.service.js";

const router = new Router();

router.init('src/routes')

const server = http.createServer(async (req, res) => {
  try {

    await router.handleRequest(req, res);

  } catch (e) {
    console.error(e);
    res.writeHead(500);
    res.end('Internal Server Error');
  }
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
