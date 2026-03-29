const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Attach Socket.IO
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

// Store room data
let rooms = {};

// When user connects
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join room
    socket.on("join-room", (roomId) => {
        socket.join(roomId);

        // Initialize room if not exists
        if (!rooms[roomId]) {
            rooms[roomId] = "";
        }

        // Send current code to new user
        socket.emit("init-code", rooms[roomId]);
    });

    // When code changes
    socket.on("code-change", ({ roomId, code }) => {
        rooms[roomId] = code;

        // Send to others (NOT sender)
        socket.to(roomId).emit("code-update", code);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Start server
server.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});