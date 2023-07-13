import express from "express";
import { router } from "./Router/router.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

export default app;
