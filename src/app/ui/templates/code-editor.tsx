import { Editor } from "@monaco-editor/react";

function CodeEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value?: string) => void;
}) {
  return (
    <Editor
      defaultValue={value.trim()}
      language="html"
      theme="vs-dark"
      onChange={onChange}
      options={{
        autoClosingQuotes: "always",
        fontSize: 14,
        trimAutoWhitespace: true,
        minimap: { enabled: false },
        contextmenu: false,
      }}
    />
  );
}

export default CodeEditor;
