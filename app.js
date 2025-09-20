import express from "express";
import dotenv from "dotenv";
import { mongoDB } from "./src/Config/database.js";
import userRoute from "./src/Routes/user.route.js";
import articleRoute from "./src/Routes/article.route.js";
import tagRoute from "./src/Routes/tag.route.js";
import commentRoute from "./src/Routes/comment.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/article", articleRoute);
app.use("/api/tag", tagRoute);
app.use("/api/comment", commentRoute);

app.listen(PORT, async () => {
  await mongoDB(),
    console.log(`Servidor funcionando en puerto: ${PORT}`),
    console.log("lo viejo está acá ↑↑↑↑↑");
  console.log("----------------------------");
  console.log("lo nuevo está acá ↓↓↓↓↓");
});
