import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";
import axios from "axios";

const TestEditor = () => {
  const editorRef = useRef(null);
  const [output, setOutput] = useState("");
  const [editorValue, setEditorValue] = useState("// Write your code here...");
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const getStudents = async () => {
      const res = await axios.get("/api/students");
      const students = res.data;
      console.log(students);
      setStudents(students);
    };
    getStudents();
  }, []);

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
