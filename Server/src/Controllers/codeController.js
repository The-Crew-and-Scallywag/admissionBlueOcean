import { Script, createContext } from "vm";

export const runCode = async (req, res) => {
  try {
    const { code } = req.body;

    const sandbox = { console };

    const context = createContext(sandbox);
    const script = new Script(code);
    res.status(200).json({ result: script.runInContext(context) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Running Code Snippet" });
  }
};
