// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import taskRoutes from "./routes/taskRoutes";
import { Task } from "./models/taskModel";

// App and config
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS and static assets
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("src/public"));

// Dashboard at "/"
app.get("/", async (req, res) => {
  const { category, priority } = req.query;
  const now = new Date();

  // Query for non-expired tasks, with optional filters
  const query: any = {
    $or: [
      { dueDate: { $gte: now } },
      { dueDate: { $exists: false } },
      { dueDate: null },
    ],
  };
  if (category)
    query.category = { $regex: new RegExp(category as string, "i") };
  if (priority)
    query.priority = { $regex: new RegExp(priority as string, "i") };

  const tasks = await Task.find(query).sort({ dueDate: 1 });

  res.render("home", {
    tasks,
    category,
    priority,
  });
});

// API routes
app.use("/api/tasks", taskRoutes);

// 404 handler last
app.all("*", (req, res) => {
  res.status(404).json({
    message: "The requested endpoint doesn't exist.",
    method: req.method,
    endpoint: req.originalUrl,
  });
});

// Database connection and server start
try {
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log("✅ Database connection OK");
} catch (err) {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
