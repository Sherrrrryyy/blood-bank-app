const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for simplicity
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 4000;

// MongoDB Connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const MessageSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", MessageSchema);

app.use(express.json());
app.use(cors());

// API Endpoint to fetch chat messages
app.get("/api/messages/:userId/:receiverId", async (req, res) => {
  const { userId, receiverId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId },
        { senderId: receiverId, receiverId: userId },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Real-time Chat using Socket.IO
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", async (data) => {
    const { senderId, receiverId, message } = data;

    // Save message in MongoDB
    const newMessage = new Message({ senderId, receiverId, message });
    await newMessage.save();

    // Emit the message to the receiver
    socket.broadcast.emit("receive_message", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
