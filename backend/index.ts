import express from "express";
import auth from "./routes/auth.routes";
import todo from "./routes/todo.route";
const app = express();
app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/todo", todo);
app.listen(3000, () => {
  console.log("app is running on 3000");
});
