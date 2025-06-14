import { Request, Response } from "express";
import { Task } from "../models/taskModel";
import mongoose from "mongoose";

//create a new task --POST /api/tasks--
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

//get all tasks --GET /api/tasks--
export const getTasks = async (req: Request, res: Response) => {
  try {
    const {
      category,
      priority,
      page = "1",
      limit = "10",
      sort = "dueDate",
      order = "asc",
    } = req.query;

    // Build query
    const query: any = {};

    // Filter: only tasks with dueDate in future (or dueDate not set)
    const now = new Date();
    query.$or = [
      { dueDate: { $gte: now } },
      { dueDate: { $exists: false } },
      { dueDate: null },
    ];

    if (category) {
      query.category = { $regex: new RegExp(category as string, "i") }; // case-insensitive
    }

    if (priority) {
      query.priority = { $regex: new RegExp(priority as string, "i") };
    }

    // Pagination
    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    // Sorting
    const sortField = sort as string;
    const sortOrder = order === "desc" ? -1 : 1;
    const sortObj: any = {};
    sortObj[sortField] = sortOrder;

    // Find
    const tasks = await Task.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum);

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks.", error: err });
  }
};

//GET /api/tasks/:id
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate the id format first
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid task ID." });
    }

    // Find task by id, and only if dueDate is in the future (or not set)
    const now = new Date();
    const task = await Task.findOne({
      _id: id,
      $or: [
        { dueDate: { $gte: now } },
        { dueDate: { $exists: false } },
        { dueDate: null },
      ],
    });

    if (!task) {
      res.status(404).json({ message: "Task not found or expired." });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch task.", error: err });
  }
};

// update an existing task --PUT /api/tasks/:id--
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Validate the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid task ID." });
    }

    const { title, description, category, priority, dueDate } = req.body;

    // Only allow updates to allowed fields
    const update: any = {};
    if (title !== undefined) update.title = title;
    if (description !== undefined) update.description = description;
    if (category !== undefined) update.category = category;
    if (priority !== undefined) update.priority = priority;
    if (dueDate !== undefined) update.dueDate = dueDate;

    // Options: new:true to return updated doc; runValidators to enforce schema rules
    const updatedTask = await Task.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      res.status(404).json({ message: "Task not found." });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task.", error: err });
  }
};
