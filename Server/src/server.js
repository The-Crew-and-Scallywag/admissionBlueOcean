import express from "express";
import {router} from "./Router/router.js"
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT

const app = express();
app.use(express.json());
app.use('/api', router)

app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}!`)
})

export default app;
