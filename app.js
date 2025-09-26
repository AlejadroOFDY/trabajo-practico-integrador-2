import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { mongoDB } from "./src/Config/database.js";
import userRoute from "./src/Routes/user.route.js";
import articleRoute from "./src/Routes/article.route.js";
import tagRoute from "./src/Routes/tag.route.js";
import commentRoute from "./src/Routes/comment.route.js";
import authRoute from "./src/Routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/articles", articleRoute);
app.use("/api/tags", tagRoute);
app.use("/api/comments", commentRoute);

app.listen(PORT, async () => {
  await mongoDB(),
    console.log(`Servidor funcionando en puerto: ${PORT}`),
    console.log("lo viejo está acá ↑↑↑↑↑");
  console.log("----------------------------");
  console.log("lo nuevo está acá ↓↓↓↓↓");
});
