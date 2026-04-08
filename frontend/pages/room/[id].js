import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import socket from "../../utils/socket";
import CodeEditor from "../../components/Editor";
import Chat from "../../components/Chat";

export default function Room() {
    const router = useRouter();
    const { id } = router.query;

    const [code, setCode] = useState("");
    const [suggestion, setSuggestion] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;

        // Join room
        socket.emit("join-room", id);

        // Receive initial code
        socket.on("init-code", (initialCode) => {
            setCode(initialCode);
        });

        // Receive updates
        socket.on("code-update", (newCode) => {
            setCode(newCode);
        });

        socket.on("ai-response", (data) => {
            setSuggestion(data.suggestion);
            setLoading(false);
        });

        return () => {
            socket.off("init-code");
            socket.off("code-update");
        };
    }, [id]);

    const autoCompleteTimer = useRef(null);

    const triggerAutoComplete = (value) => {
        if (autoCompleteTimer.current) clearTimeout(autoCompleteTimer.current);
        autoCompleteTimer.current = setTimeout(() => {
            if (value.trim()) getSuggestion();
        }, 1500);
    };

    const handleChange = (value) => {
        setCode(value);

        socket.emit("code-change", {
            roomId: id,
            code: value,
        });

        // 👇 Trigger AI after typing
        triggerAutoComplete(value);
    };

    const getSuggestion = () => {
        setLoading(true);
        setSuggestion("");

        socket.emit("get-ai-suggestion", {
            code,
            socketId: socket.id,
        });
    };

    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
                <h2 style={{ textAlign: "center" }}>Room: {id}</h2>

                {/* 🔘 BUTTON */}
                <div style={{ textAlign: "center", marginBottom: "10px" }}>
                    <button onClick={getSuggestion}>
                        {loading ? "⏳ Thinking..." : "Get AI Suggestion"}
                    </button>
                </div>

                {/* 🧠 LOADING TEXT */}
                {loading && (
                    <p style={{ textAlign: "center", color: "yellow" }}>
                        AI is analyzing your code...
                    </p>
                )}

                {/* 💡 THIS IS STEP 4 — ADD HERE */}
                {suggestion && (
                    <div
                        style={{
                            background: "#222",
                            color: "#0f0",
                            padding: "10px",
                            margin: "10px",
                            borderRadius: "5px",
                        }}
                    >
                        💡 AI Suggestion: {suggestion}
                    </div>
                )}

                {/* 💻 EDITOR */}
                <CodeEditor code={code} onChange={handleChange} />
            </div>

            <Chat roomId={id} />
        </div>
    );
}
