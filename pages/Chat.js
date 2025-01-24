'use client';

import { useEffect, useState } from "react";
import socket from "../socket"; // Import the socket instance
import axios from "axios";

const Chat = ({ userId, receiverId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch initial messages
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/messages/${userId}/${receiverId}`);
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();

    // Listen for incoming messages
    socket.on("receive_message", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => socket.off("receive_message");
  }, [userId, receiverId]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { senderId: userId, receiverId, message };
      setMessages((prev) => [...prev, newMessage]); // Optimistically update the UI
      socket.emit("send_message", newMessage);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Chat</h2>
        <div className="mb-4 max-h-80 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-md ${
                msg.senderId === userId ? "bg-blue-100 self-end" : "bg-gray-200"
              }`}
            >
              <p>{msg.message}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-grow border px-3 py-2 rounded-md"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

// Example: Set userId and receiverId dynamically
Chat.getInitialProps = async ({ query }) => {
  const { userId, receiverId } = query;
  return { userId, receiverId };
};
