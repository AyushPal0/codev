import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, onChange }) {
    return (
        <Editor
            height="85vh"
            defaultLanguage="javascript"
            value={code}
            onChange={(value) => onChange(value || "")}
            theme="vs-dark"
            options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: "on",
                automaticLayout: true,
            }}
        />
    );
}