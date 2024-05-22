import express from "express";
const app = express();
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const PORT = 3001;
app.use(cors());

const server = http.createServer(app);

// const FRONTEND_URL = "http://localhost:3000";
const FRONTEND_URL = "https://sm-chatapp.netlify.app/";

const io = new Server(server, {
    cors: {
        origin: "*",
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
});

app.get("/", (req, res) => {
    res.send("<h2>Hello from SM Chat App Backend</h2>");
});

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});