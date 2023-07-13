import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";

const TestEditor = () => {
  const editorRef = useRef(null);
  const [output, setOutput] = useState("");
  const [editorValue, setEditorValue] = useState("// Write your code here...");

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    // initialize YJS
    const doc = new Y.Doc();
    console.log(doc);
    // connect to peers
    const provider = new WebrtcProvider("interview", doc);
    const type = doc.getText("monaco");
    const binding = new MonacoBinding(
      type,
      editorRef.current.getModel(),
      new Set([editorRef.current], provider.awareness)
    );

    // Bind YJS to Monaco
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
        className={`h-[700px] w-full rounded-lg shadow-xl shadow-black bg-bg/20 border-2 border-secondary/50 `}
      >
        <Editor
          height="100%"
          width="100%"
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue={editorValue}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 18,
            cursorStyle: "line-thin",
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: true,
            scrollBeyondLastLine: false,
            wordWrap: "on",
            minimap: { enabled: false },
            padding: { top: 20, bottom: 20 },
          }}
        />
      </div>
      <button
        onClick={() => handleOutput()}
        className="bg-bg p-2 w-40 rounded-lg text-white/50 my-12  hover:scale-105 hover:bg-bg/70 hover:border-[1px] hover:border-accent transition-transform duration-300 ease-in-out shadow-lg shadow-black"
      >
        Run
      </button>
      {output && <div className="bg-secondary">{output}</div>}
    </div>
  );
};

export default TestEditor;
