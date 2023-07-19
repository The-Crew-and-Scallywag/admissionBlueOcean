import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark as dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import axios from "axios";
import { useParams } from "react-router-dom";

const TestEditor = ({ student, students, setStudent }) => {
  const editorRef = useRef(null); // Reference to the Monaco editor instance
  const codeRef = useRef(null); // Reference to the code returned
  const [results, setResults] = useState([]); // State variable for the output of the code
  const [editorValue, setEditorValue] = useState("// Write your code here..."); // State variable for the initial value of the editor
  const [outputValues, setOutputValues] = useState([]); // State variable for storing the output values
  const [loading, setLoading] = useState(true);
  const handleOutput = async (output) => {
    const res = await axios.post("/api/run", {
      code: output,
    });
    let returnValue = res.data.result;

    setResults([...results, returnValue]); // Update the output state variable
  };

  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/student/${id}`).then((res) => {
      setStudent(res.data);
    });
    setLoading(false);
  }, []);

  console.log(student);

  useEffect(() => {
    if (codeRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = codeRef.current;

      // Calculate the target scroll position
      const targetScrollTop = scrollHeight - clientHeight;

      // Scroll to the target position with smooth animation
      codeRef.current.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });
    }
  }, [results.length]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor; // Store the Monaco editor instance reference in the ref

    const doc = new Y.Doc(); // Create a new Y.Doc instance for collaborative editing

    const provider = new WebrtcProvider("interview", doc); // Create a WebRTC provider for peer-to-peer communication
    const type = doc.getText("monaco"); // Get a Y.Text type for Monaco editor
    const binding = new MonacoBinding(
      type,
      editorRef.current.getModel(),
      new Set([editorRef.current], provider.awareness)
    ); // Create a binding between YJS and Monaco editor to synchronize the document

    // Bind YJS to Monaco editor
  };

  const handleClear = () => {
    codeRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => {
      setResults([]);
    }, 500);
  };

  const handleReset = () => {
    setEditorValue("// Write your code here...");
  };

  return (
    <div>
      <div className="h-full w-full mx-auto my-20 items-center flex flex-col custom:flex-row">
        <div className="flex flex-col items-center">
          <h1 className="p-2 mb-2 text-xl font-bold tracking-wide text-white/70 underline-offset-2">
            Currently Interviewing:{" "}
            {!loading && student && (
              <span className="text-accent text-md tracking-wide italic">
                {student.first_name} {student.last_name}
              </span>
            )}
          </h1>
          <div
            id="editor"
            className={`h-[800px] rounded-lg shadow-xl shadow-black bg-bg/20 border-2 border-secondary/50 transform transition-all duration-150 ease ${
              results.length ? "w-[700px]" : "w-[900px]"
            }`}
          >
            <Editor
              height="100%"
              width="100%"
              theme="vs-dark"
              defaultLanguage="javascript"
              defaultValue={editorValue}
              ref={editorRef}
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
          <div className="flex flex-row gap-4">
            <button
              onClick={() => handleOutput(editorRef.current.getValue())}
              className="bg-bg p-2 w-40 rounded-lg text-white/50 my-12  hover:scale-105 hover:bg-bg/70 hover:border-[1px] hover:border-accent transition-transform duration-300 ease-in-out shadow-lg shadow-black"
            >
              Run
            </button>
            <button
              onClick={handleReset}
              className="bg-bg p-2 w-40 rounded-lg text-white/50 my-12  hover:scale-105 hover:bg-bg/70 hover:border-[1px] hover:border-accent transition-transform duration-300 ease-in-out shadow-lg shadow-black"
            >
              Reset Editor
            </button>
            {results.length > 0 && (
              <button
                onClick={handleClear}
                className="bg-bg p-2 w-40 rounded-lg text-white/50 my-12  hover:scale-105 hover:bg-bg/70 hover:border-[1px] hover:border-red-400 transition-transform duration-300 ease-in-out shadow-lg shadow-black"
              >
                Clear Output
              </button>
            )}
          </div>
        </div>
        {results.length > 0 && (
          <div className="bg-bg p-4 text-lg text-center text-white font-normal m-4 transition-all duration-150 ease min-w-[400px] rounded-lg shadow-black shadow-xl h-full relative top-[-50px]">
            <h1 className="text-2xl text-white/70 font-bold self-center p-2 mb-2">
              Outputs:
            </h1>
            <div className="w-full border-b-2 border-accent"></div>
            <div
              ref={codeRef}
              className="max-h-[700px] overflow-y-auto no-scrollbar h-full relative"
            >
              {results.length > 0 &&
                results.map((item, index) => (
                  <div
                    key={index}
                    className="bg-secondary p-4 my-4 rounded-lg shadow-lg shadow-black text-left"
                  >
                    <span className="italic text-accent font-bold">
                      Output {index + 1}:{" "}
                    </span>
                    {item.map((code, index) => (
                      <SyntaxHighlighter
                        language="javascript"
                        style={dark}
                        key={index}
                        className="py-2 m-2 rounded-lg shadow-lg shadow-black  overflow-visible"
                      >
                        {JSON.stringify(code[0], null)}
                      </SyntaxHighlighter>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestEditor;
