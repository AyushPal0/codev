import { useState, useEffect } from "react";
import socket from "../utils/socket";

export default function Chat({ roomId }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("receive-message", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off("receive-message");
        };
    }, []);

    const sendMessage = () => {
        if (!message) return;

        socket.emit("send-message", { roomId, message });

        setMessages((prev) => [...prev, message]);
        setMessage("");
    };

    return (
        <div style={{ width: "300px", borderLeft: "1px solid gray" }}>
            <h3>Chat</h3>

            <div style={{ height: "300px", overflowY: "scroll" }}>
                {messages.map((msg, i) => (
                    <div key={i}>{msg}</div>
                ))}
            </div>

            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}