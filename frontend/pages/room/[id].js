import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import socket from "../../utils/socket";
import CodeEditor from "../../components/Editor";
import Chat from "../../components/Chat";

export default function Room() {
    const router = useRouter();
    const { id } = router.query;

    const [code, setCode] = useState("");

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
            alert(data.suggestion);
        });

        return () => {
            socket.off("init-code");
            socket.off("code-update");
        };
    }, [id]);

    const handleChange = (value) => {
        setCode(value);

        socket.emit("code-change", {
            roomId: id,
            code: value,
        });
    };

    const getSuggestion = () => {
        socket.emit("get-ai-suggestion", {
            code,
            socketId: socket.id,
        });
    };

    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
                <h2 style={{ textAlign: "center" }}>Room: {id}</h2>

                {/* 👇 ADD BUTTON HERE */}
                <div style={{ textAlign: "center", marginBottom: "10px" }}>
                    <button onClick={getSuggestion}>
                        Get AI Suggestion
                    </button>
                </div>

                <CodeEditor code={code} onChange={handleChange} />
            </div>

            <Chat roomId={id} />
        </div>
    );
}