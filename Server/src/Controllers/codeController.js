import { createContext, runInContext } from "vm";

export const runCode = (req, res) => {
  try {
    const { code } = req.body; // code from front end

    const sandbox = {
      console: {
        // access to console.log
        log: (...args) => {
          //
          sandbox.result = args; // Capture the result using sandbox.result
        },
      },
    };

    const context = createContext(sandbox);
    runInContext(code, context);

    const result = sandbox.result; // Retrieve the result from sandbox.result
    return res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Running Code Snippet" });
  }
};
