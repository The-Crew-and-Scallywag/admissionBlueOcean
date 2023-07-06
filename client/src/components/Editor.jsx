import React, { useEffect, useRef } from "react";
import "codemirror/lib/codemirror.css"; // Import CodeMirror styles
import CodeMirror from "codemirror"; // Import the CodeMirror library
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";

// Feel free to change and style as needed- "Scallywag"
// Edit ln 34 via tailwind to style - "Scallywag"

const Editor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    // Initialize CodeMirror once mounted
    const editor = CodeMirror.fromTextArea(editorRef.current, {
      lineNumbers: true,
      mode: "htmlmixed",
    });

    // Handle editor changes if needed
    editor.on("change", (instance) => {
      // Access the code content using instance.getValue()
      console.log(instance.getValue());
    });

    // Clean up instance when unmounted
    return () => {
      editor.toTextArea();
    };
  }, []);

  return (
    <div>
      <textarea ref={editorRef} />
    </div>
  );
};

export default Editor;
