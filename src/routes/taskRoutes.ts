import { Router } from "express";
import { createTask, getTasks } from "../controllers/taskController";

const router = Router();

//POST a new task
router.post("/", createTask);

//GET all tasks
router.get("/", getTasks);

export default router;
