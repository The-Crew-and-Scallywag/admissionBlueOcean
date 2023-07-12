import React, { useEffect, useRef, useState } from "react";
import "codemirror/lib/codemirror.css";
import * as CodeMirror from "codemirror";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";

const Editor = ({ handleOutput }) => {
  const editorRef = useRef(null);
  const [output, setOutput] = useState("");
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    const newEditor = CodeMirror.fromTextArea(editorRef.current, {
      lineNumbers: true,
      mode: "htmlmixed",
    });
    setEditor(newEditor);

    newEditor.on("change", (instance) => {});

    return () => {
      newEditor.toTextArea();
    };
  }, []);

  const runCode = () => {
    const code = editor.getValue();
    setOutput("");

    try {
      const result = Function(code)();
      setOutput(result);
      handleOutput(result); // DISPLAY
    } catch (error) {
      setOutput(`Error: ${error.message}`); // DISPLAY ERROR
    }
  };

  return (
    <>
      <div className="w-1/2 mx-auto overflow-auto">
        <textarea ref={editorRef} />
        <button onClick={runCode}>Run</button>
      </div>
      <div className="output-area">{output}</div>
    </>
  );
};

export default Editor;
