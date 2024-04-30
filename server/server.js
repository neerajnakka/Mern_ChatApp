import path from 'path';
import express from 'express';
import { app, server } from './socket/socket.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import connectToMongoDB from './database/connectToMdb.js';

const PORT_URL = process.env.PORT || 5000;
const __dirname = path.resolve();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
server.listen(PORT_URL, () => {
  connectToMongoDB();
  console.log(`listening on ${PORT_URL} successfully`);
});
