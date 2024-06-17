// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 4000;

let userCount = 0;

io.on('connection', (socket) => {
    userCount++;
    socket.username = `Usuario ${userCount}`;
    console.log(`${socket.username} conectado`);

    socket.on('disconnect', () => {
        console.log(`${socket.username} desconectado`);
        userCount--;
    });

    socket.on('chat message', (msg) => {
        console.log(`Mensaje recibido de ${socket.username}: ${msg}`);
        io.emit('chat message', `${socket.username}: ${msg}`);
    });

    socket.emit('username', socket.username);
});

server.listen(PORT, () => {
    console.log(`Servidor de sockets corriendo en el puerto ${PORT}`);
});