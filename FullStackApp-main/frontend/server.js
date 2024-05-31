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

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    socket.on('chat message', (msg) => {
        console.log(`Mensaje recibido: ${msg}`);
        io.emit('chat message', msg);
    });
});

server.listen(PORT, () => {
    console.log(`Servidor de sockets corriendo en el puerto ${PORT}`);
});
