import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
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
  const [type, setType] = useState(null);
  const [provider, setProvider] = useState(null);
  const [yResults, setYResults] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/student/${id}`).then((res) => {
      setStudent(res.data);
    });
    setLoading(false);
  }, []);

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

  const handleOutput = async (output) => {
    setErrorMessage(null);
    try {
      const res = await axios.post("/api/run", { code: output });
      console.log(res);
      const newResult = res.data.result.map((resultItem) => [resultItem]);
      setResults((prevResults) => [...prevResults, newResult]);
      yResults.push([res.data.result]);
    } catch (error) {
      console.log(error);
      const newErrorArr = [];
      const newError = error.response.data.message;
      newErrorArr.push([newError]);
      setResults((prevResults) => [...prevResults, newErrorArr]);
      yResults.push([newErrorArr]);
      setErrorMessage(error.response.data.message);
    }
  };

  console.log(errorMessage);
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor; // Store the Monaco editor instance reference in the ref

    const doc = new Y.Doc(); // Create a new Y.Doc instance for collaborative editing

    const wsResults = doc.getArray("wsResults");
    wsResults.observe((event) => {
      setResults(event.target.toArray());
    });

    const room = `interview-${id}`; // Get the room name from the URL

    console.log(doc);

    const newProvider = new WebsocketProvider(
      import.meta.env.VITE_WS,
      room,
      doc
    );
    setProvider(newProvider);
    const yType = doc.getText("monaco"); // Get a Y.Text type for Monaco editor
    const binding = new MonacoBinding(
      yType,
      editorRef.current.getModel(),
      new Set([editorRef.current], newProvider.awareness)
    ); // Create a binding between YJS and Monaco editor to synchronize the document
    setType(yType);
    setYResults(wsResults);

    // Bind YJS to Monaco editor
  };

  const handleClear = () => {
    codeRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => {
      setResults([]);
      yResults.delete(0, yResults.length);
    }, 500);
  };

  console.log(results);
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
            className={`h-[800px] rounded-lg shadow-xl shadow-black bg-bg/20 border-2 transform transition-all duration-150 ease ${
              results.length ? "w-[700px]" : "w-[900px]"
            } ${errorMessage ? "border-red-400" : "border-secondary/50"}`}
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
              onClick={() => handleOutput(editorRef.current.getValue())}
              className="bg-bg p-2 w-40 rounded-lg text-white/50 my-12  hover:scale-105 hover:bg-bg/70 hover:border-[1px] hover:border-accent transition-transform duration-300 ease-in-out shadow-lg shadow-black"
            >
              Run
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
                    {item.map((resultItem, index) => (
                      <SyntaxHighlighter
                        language="javascript"
                        style={dark}
                        key={index}
                        wrapLines={true}
                        className={`py-2 m-2 rounded-lg shadow-lg shadow-black ${
                          resultItem[0] === "Error Running Code Snippet" &&
                          "text-red-400"
                        }`}
                      >
                        {JSON.stringify(resultItem[0], null)}
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
