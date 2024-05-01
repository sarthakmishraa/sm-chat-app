const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const PORT = 3001;
app.use(cors);  
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        // origin: "http://localhost:3000",
        origin: "https://smchatapp.netlify.app/",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log(`User connected with id: ${socket.id}`);

    socket.on('join room', (data) => {
        socket.join(data);
    })

    socket.on('send message', (data) => {
        // socket.broadcast.emit('recieved message', message);
        socket.to(data.roomCode).emit('recieved message', data)
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected with id: ${socket.id}`);
    });
})

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});