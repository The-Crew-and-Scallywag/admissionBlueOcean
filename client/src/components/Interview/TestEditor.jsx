import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";

const TestEditor = ({ student, students, setStudent }) => {
  const editorRef = useRef(null); // Reference to the Monaco editor instance
  const [output, setOutput] = useState(""); // State variable for the output of the code
  const [editorValue, setEditorValue] = useState("// Write your code here..."); // State variable for the initial value of the editor
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor; // Store the Monaco editor instance reference in the ref

    const doc = new Y.Doc(); // Create a new Y.Doc instance for collaborative editing
    console.log(doc);

    const provider = new WebrtcProvider("interview", doc); // Create a WebRTC provider for peer-to-peer communication
    const type = doc.getText("monaco"); // Get a Y.Text type for Monaco editor
    const binding = new MonacoBinding(
      type,
      editorRef.current.getModel(),
      new Set([editorRef.current], provider.awareness)
    ); // Create a binding between YJS and Monaco editor to synchronize the document

    // Bind YJS to Monaco editor
  };

  return (
    <div>
      {student ? (
        <div className="h-full w-full mx-auto my-20 items-center flex flex-col">
          <h1 className="p-2 mb-2 text-xl font-bold tracking-wide text-white/70 underline-offset-2">
            Currently Interviewing:{" "}
            <span className="text-accent text-md tracking-wide italic">
              {student.first_name} {student.last_name}
            </span>
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
      ) : (
        <div className="h-full w-full flex flex-col justify-center">
          <h1 className="p-2 mb-2 text-xl font-bold tracking-wide text-white text-center">
            Select a student to interview:
          </h1>
          <div className="flex flex-row flex-wrap justify-center">
            {students.map((student) => (
              <div
                key={student.id}
                onClick={() => setStudent(student)}
                className=" text-white/70 bg-bg/20 border-2 border-secondary/50 rounded-lg shadow-xl shadow-black m-2 p-2 hover:scale-105 hover:bg-bg/70 hover:border-[1px] hover:border-accent transition-transform duration-300 ease-in-out cursor-pointer"
              >
                {student.first_name} {student.last_name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestEditor;
