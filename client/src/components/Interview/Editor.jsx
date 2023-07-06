import React, { useEffect, useRef, useState } from "react";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
// code mirror documentation. Feel free to style on ln 41 https://codemirror.net/  - "Scallywag"
const Editor = () => {
  const editorRef = useRef(null);
  const [output, setOutput] = useState("");

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(editorRef.current, {
      lineNumbers: true,
      mode: "htmlmixed",
    });

    editor.on("change", (instance) => {
      console.log(instance.getValue());
    });

    return () => {
      editor.toTextArea();
    };
  }, []);

  const runCode = () => {
    const code = editorRef.current.value;
    setOutput("");

    try {
      const result = eval(code);
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
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