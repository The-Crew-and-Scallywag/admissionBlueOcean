import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";

const TestEditor = () => {
  const editorRef = useRef(null);
  const [output, setOutput] = useState("");

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    // initialize YJS
  };

  const handleEditorChange = (value, event) => {
    console.log(value);
  };

  const handleOutput = () => {
    const code = editorRef.current.getValue();
    setOutput(code);
  };

  return (
    <div className="h-full w-full mx-auto my-20 items-center flex flex-col">
      <h1 className="p-2 mb-2 text-xl font-bold tracking-wide text-accent italic underline-offset-2 underline underline:black">
        Challenge Editor
      </h1>
      <div
        id="editor"
        className="h-[700px] w-full rounded-lg shadow-xl shadow-black bg-bg/20 border-2 border-secondary"
      >
        <Editor
          height="100%"
          width="100%"
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue="// your code here..."
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
          options={{
            fontSize: 18,
            cursorStyle: "line-thin",
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: true,
            scrollBeyondLastLine: false,
            wordWrap: "on",
            minimap: { enabled: false },
            padding: { top: 20, bottom: 20 },
            zIndex: 0,
          }}
        />
      </div>
      <button
        onClick={() => handleOutput()}
        className="bg-secondary p-2 w-40 rounded-lg text-white/50 my-12  hover:scale-105 hover:bg-bg/20 hover:border-[1px] hover:border-accent transition-transform duration-300 ease-in-out"
      >
        Run
      </button>
      {output && <div className="bg-secondary">{output}</div>}
    </div>
  );
};

export default TestEditor;
