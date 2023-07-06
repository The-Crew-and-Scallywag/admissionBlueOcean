import React, { useEffect, useRef, useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import CodeMirror from "codemirror";

const Editor = () => {
  const editorRef = useRef(null);
  const [output, setOutput] = useState("");

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(editorRef.current, {
      lineNumbers: true,
      mode: "htmlmixed",
      autoCloseBrackets: true,
      matchBrackets: true,
    });

    editor.on("change", (instance) => {
      console.log(instance.getValue());
    });

    // TAILWIND ISN'T WORKING AH
    editor.getWrapperElement().classList.add("bg-gray-900", "text-white");

    return () => {
      editor.toTextArea();
    };
  }, []);

  const runCode = () => {
    const code = editorRef.current.value;
    setOutput("");

    try {
      const result = eval(code);
      setOutput(String(result));
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
