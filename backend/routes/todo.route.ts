import { Router } from "express";
import {
  createTodoController,
  deleteTodoController,
  getTodoController,
  updateTodoController,
} from "../controller/todo.controller";

const router = Router();

router.post("/", createTodoController);
router.get("/", getTodoController);
router.put("/:id", updateTodoController);
router.delete("/:id", deleteTodoController);

export default router;
