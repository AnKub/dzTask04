import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

const getSocket = () => {
  if (!socket) {
    socket = io(process.env.REACT_APP_SOCKET_URL ?? 'http://localhost:4000', {
      transports: ['websocket'],
      autoConnect: false,
      reconnectionAttempts: 2,
      reconnectionDelay: 1000,
      timeout: 3000,
    });
  }

  return socket;
};

export const subscribeToActiveSessions = (callback: (count: number) => void) => {
  const client = getSocket();
  const handleUpdate = (count: number) => callback(count);

   if (!client.connected) {
    client.connect();
   }

  client.on('sessions:update', handleUpdate);

  return () => {
    client.off('sessions:update', handleUpdate);
  };
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};