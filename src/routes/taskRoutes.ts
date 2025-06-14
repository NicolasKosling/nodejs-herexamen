import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
} from "../controllers/taskController";

const router = Router();

//POST a new task
router.post("/", createTask);

//GET all tasks
router.get("/", getTasks);

//GET task by id
router.get("/:id", getTaskById);

//UPDATE task by id
router.put("/:id", updateTask);

export default router;
