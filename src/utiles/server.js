const { createServer } = require("http");
const next = require("next");
const app = next({ dev });
const handle = app.getRequestHandler();
const createSocketServer = require("./socketServer");

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const io = createSocketServer(server);

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
