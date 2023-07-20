import React, { useState, useRef, useEffect, useCallback } from "react";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark as dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import axios from "axios";
import { useParams } from "react-router-dom";

const TestEditor = ({ setStudent }) => {
  const editorRef = useRef(null);
  const codeRef = useRef(null);
  const [results, setResults] = useState([]);
  const [editorValue, setEditorValue] = useState("// Write your code here...");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/student/${id}`);
        setStudent(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error while fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, setStudent]);

  useEffect(() => {
    if (codeRef.current) {
      const { scrollHeight, clientHeight } = codeRef.current;
      const targetScrollTop = scrollHeight - clientHeight;

      codeRef.current.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });
    }
  }, [results.length]);

  const handleEditorDidMount = useCallback((editor, monaco) => {
    editorRef.current = editor;
    const doc = new Y.Doc();
    const provider = new WebsocketProvider(
      import.meta.env.VITE_WS,
      "interview",
      doc
    );
    const type = doc.getText("monaco");
    const binding = new MonacoBinding(
      type,
      editorRef.current.getModel(),
      new Set([editorRef.current], provider.awareness)
    );
  }, []);

  const handleOutput = useCallback(async () => {
    try {
      const res = await axios.post("api/run", {
        code: editorRef.current.getValue(),
      });
      const returnValue = res.data.result;
      setResults((prevResults) => [...prevResults, returnValue]);
    } catch (error) {
      console.error("Error while handling output:", error);
    }
  }, []);

  const handleClear = useCallback(() => {
    codeRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => {
      setResults([]);
    }, 500);
  }, []);

  const handleReset = useCallback(() => {
    setEditorValue("// Write your code here...");
  }, []);

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
              onClick={handleOutput}
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
              {results.map((item, index) => (
                <div
                  key={index}
                  className="bg-secondary p-4 my-4 rounded-lg shadow-lg shadow-black text-left"
                >
                  <span className="italic text-accent font-bold">
                    Output {index + 1}:{" "}
                  </span>
                  {item.map((code, codeIndex) => (
                    <SyntaxHighlighter
                      language="javascript"
                      style={dark}
                      key={codeIndex}
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
