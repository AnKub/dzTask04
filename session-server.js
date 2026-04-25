const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const emitSessionsCount = () => {
  io.emit('sessions:update', io.engine.clientsCount);
};

io.on('connection', (socket) => {
  emitSessionsCount();

  socket.on('disconnect', () => {
    emitSessionsCount();
  });
});

server.listen(4000, () => {
  process.stdout.write('Socket server listening on http://localhost:4000\n');
});