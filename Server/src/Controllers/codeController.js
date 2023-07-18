import { createContext, runInContext } from "vm";

export const runCode = (req, res) => {
  try {
    const { code } = req.body; // code from front end

    const sandbox = {
      console: {
        // access to console.log
        log: (...args) => {
          if (!sandbox.result) {
            sandbox.result = [];
          }
          sandbox.result.push(args); // Capture the result using sandbox.result
        },
      },
    };

    const context = createContext(sandbox);
    runInContext(code, context);

    const result = sandbox.result || []; // Retrieve the result from sandbox.result or an empty array if it doesn't exist
    return res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Running Code Snippet" });
  }
};
