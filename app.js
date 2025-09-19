import express from "express";
import dotenv from "dotenv";
import { mongoDB } from "./src/Config/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await mongoDB(),
    console.log(`Servidor funcionando en puerto: ${PORT}`),
    console.log("lo viejo está acá ↑↑↑↑↑");
  console.log("----------------------------");
  console.log("lo nuevo está acá ↓↓↓↓↓");
});
