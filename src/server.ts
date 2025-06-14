// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

// Optionally: import notFound and your routes
// import { notFound } from "./controllers/notFoundController";
// import tasksRoutes from "./routes/tasksRoutes";

// Variables
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS and static (for dashboard in later steps)
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("src/public"));

// Health check
app.get("/", (_req, res) => {
  res.send("🟢 API & server up!");
});

// // Example of where routes will go soon
// app.use("/api/tasks", tasksRoutes);
// app.all("*", notFound);

// Database connection before listening
try {
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log("Database connection OK");
} catch (err) {
  console.error("MongoDB connection error:", err);
  process.exit(1);
}

//server listening
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
