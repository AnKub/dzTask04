import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;
let activeSubscriptions = 0;

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
  let isSubscribed = true;

  if (!client.connected) {
    client.connect();
  }

  client.on('sessions:update', handleUpdate);
  activeSubscriptions += 1;

  return () => {
    if (!isSubscribed) {
      return;
    }

    isSubscribed = false;
    client.off('sessions:update', handleUpdate);
    activeSubscriptions -= 1;

    if (activeSubscriptions === 0) {
      disconnectSocket();
    }
  };
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }

  activeSubscriptions = 0;
};