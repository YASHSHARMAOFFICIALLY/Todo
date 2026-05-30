import express from "express";
import auth from "./routes/auth.routes";
import todo from "./routes/todo.route";

const app = express();

// CORS: tell the browser "I allow requests from the frontend"
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Browser sends a "preflight" OPTIONS request before POST/PUT/DELETE
  // to ask "is this allowed?" — we respond 204 (yes, go ahead)
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
});

app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/todo", todo);

app.listen(3000, () => {
  console.log("app is running on 3000");
});
