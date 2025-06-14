// src/scripts/clear.ts
import mongoose from "mongoose";
import { Task } from "../models/taskModel";
import "dotenv/config";

async function clear() {
  await mongoose.connect(process.env.MONGODB_URI!);
  await Task.deleteMany();
  console.log("🧹 Cleared all tasks.");
  await mongoose.disconnect();
}

clear().catch((err) => {
  console.error(err);
  process.exit(1);
});
