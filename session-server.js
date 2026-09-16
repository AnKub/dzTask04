const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const port = Number(process.env.PORT) || 4000;

const emitSessionsCount = () => {
  io.emit('sessions:update', io.engine.clientsCount);
};

io.on('connection', (socket) => {
  emitSessionsCount();

  socket.on('disconnect', () => {
    emitSessionsCount();
  });
});

server.listen(port, () => {
  process.stdout.write(`Socket server listening on port ${port}\n`);
});