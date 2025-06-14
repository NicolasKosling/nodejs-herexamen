import { Request, Response } from "express";
import { Task } from "../models/taskModel";

//create a new task --POST--
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, category, priority, dueDate } = req.body;

    if (!title || !description || !category || !priority) {
      res.status(400).json({ message: "Missing required fields." });
    }
    const task = await Task.create({
      title,
      description,
      category,
      priority,
      dueDate,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to create task.", error: err });
  }
};
