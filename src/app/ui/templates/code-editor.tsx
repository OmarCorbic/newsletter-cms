import React, { useRef } from "react";

import { Editor } from "@monaco-editor/react";

const trimNewlinesInStyleAttributes = (html: string) => {
  const replaceNewlines = (match: string) => match.replace(/\n\s*/g, " ");
  const pattern = /style="[^"]*"/g;
  return html.replace(pattern, replaceNewlines);
};

function CodeEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value?: string) => void;
}) {
  const editorRef = useRef<any>(null);
  const handleKeyDown = (e: any) => {
    if (e.ctrlKey && e.key.toLowerCase() === "s") {
      e.preventDefault();
      const brokenText: string = editorRef.current.getValue();
      const fixedText = trimNewlinesInStyleAttributes(brokenText);
      editorRef.current.setValue(fixedText);
    }
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
  };

  return (
    <div onKeyDown={handleKeyDown} className="h-full">
      <Editor
        onMount={handleEditorDidMount}
        defaultValue={value.trim()}
        language="html"
        theme="vs-dark"
        onChange={onChange}
        options={{
          padding: { top: 20, bottom: 20 },
          tabSize: 2,
          formatOnPaste: true,
          wordWrap: "on",
          detectIndentation: false,
          autoClosingQuotes: "always",
          fontSize: 14,
          minimap: { enabled: false },
          contextmenu: false,
        }}
      />
    </div>
  );
}

export default CodeEditor;
