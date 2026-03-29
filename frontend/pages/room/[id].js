import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import socket from "../../utils/socket";
import CodeEditor from "../../components/Editor";

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

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Room: {id}</h2>
            <CodeEditor code={code} onChange={handleChange} />
        </div>
    );
}