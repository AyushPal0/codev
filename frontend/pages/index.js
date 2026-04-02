import { useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
    const router = useRouter();
    const [roomId, setRoomId] = useState("");

    const createRoom = () => {
        const newId = uuidv4();
        router.push(`/room/${newId}`);
    };

    const joinRoom = (e) => {
        e.preventDefault();
        if (roomId.trim()) {
            router.push(`/room/${roomId.trim()}`);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>⚡ CodeV</h1>
                <p style={styles.subtitle}>Real-time collaborative code editor</p>

                <button style={styles.primaryBtn} onClick={createRoom}>
                    Create New Room
                </button>

                <div style={styles.divider}>or</div>

                <form onSubmit={joinRoom} style={styles.form}>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Enter Room ID"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                    <button style={styles.secondaryBtn} type="submit">
                        Join Room
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
        fontFamily: "'Segoe UI', sans-serif",
    },
    card: {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "16px",
        padding: "48px 40px",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    },
    title: {
        fontSize: "2.5rem",
        fontWeight: "800",
        color: "#fff",
        margin: "0 0 8px",
        letterSpacing: "-1px",
    },
    subtitle: {
        color: "#888",
        fontSize: "0.95rem",
        marginBottom: "36px",
    },
    primaryBtn: {
        width: "100%",
        padding: "14px",
        background: "linear-gradient(135deg, #6c63ff, #48c6ef)",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        fontSize: "1rem",
        fontWeight: "600",
        cursor: "pointer",
        transition: "opacity 0.2s",
    },
    divider: {
        color: "#555",
        margin: "20px 0",
        fontSize: "0.85rem",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    input: {
        padding: "13px 16px",
        borderRadius: "10px",
        border: "1px solid rgba(255,255,255,0.15)",
        background: "rgba(255,255,255,0.07)",
        color: "#fff",
        fontSize: "0.95rem",
        outline: "none",
    },
    secondaryBtn: {
        width: "100%",
        padding: "13px",
        background: "transparent",
        color: "#6c63ff",
        border: "2px solid #6c63ff",
        borderRadius: "10px",
        fontSize: "1rem",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s",
    },
};