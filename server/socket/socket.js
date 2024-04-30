// Import necessary modules
import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express(); // Create an Express application

// Create an HTTP server using the Express application
const server = http.createServer(app);

// Create a Socket.IO server instance on top of the HTTP server
const io = new Server(server, {
  // Configure CORS policy to allow connections from localhost:3000
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {};

// Listen for 'connection' event, fires when a client connects
io.on('connection', (socket) => {
  // Log a message when a user connects, along with the socket ID
  console.log('Socket connected: user connected', socket.id);

  // Access userId from the query parameters
  const userId = socket.handshake.query.userId;

  // Store userId and socketId in a map
  if (userId !== 'undefined') {
    userSocketMap[userId] = socket.id;
  }

  // Emit online users to all clients
  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  // Listen for 'disconnect' event, fires when a user disconnects
  socket.on('disconnect', () => {
    // Log a message when a user disconnects, along with the socket ID
    console.log('User disconnected', socket.id);

    // Remove the user from the map when disconnected
    delete userSocketMap[userId];

    // Emit updated online users to all clients
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

// Export the Express app, Socket.IO instance, and HTTP server for external use
export { app, io, server };
