// src/scripts/seed.ts
import mongoose from "mongoose";
import { Task } from "../models/taskModel";
import "dotenv/config";

// Sample data array (customize as needed)
const data = [
  {
    title: "Maak een REST API",
    description: "Ontwikkel een takenbeheer API met Node.js",
    category: "Development",
    priority: "high",
    dueDate: "2025-04-10T12:00:00Z",
  },
  {
    title: "Schrijf API-documentatie",
    description: "Maak een duidelijke README voor de API",
    category: "Documentation",
    priority: "medium",
    dueDate: "2025-04-12T15:00:00Z",
  },
  {
    title: "Implementeer authenticatie",
    description: "Voeg JWT-tokenverificatie toe aan de API",
    category: "Security",
    priority: "high",
    dueDate: "2025-04-15T09:30:00Z",
  },
  {
    title: "Front-end koppelen aan API",
    description: "Verbind de React-app met de API",
    category: "Development",
    priority: "high",
    dueDate: "2025-04-18T14:00:00Z",
  },
  {
    title: "Unit tests schrijven",
    description: "Schrijf Jest-tests voor de belangrijkste API-routes",
    category: "Testing",
    priority: "medium",
    dueDate: "2025-04-20T10:00:00Z",
  },
  {
    title: "Database-optimalisatie",
    description: "Optimaliseer MongoDB-indexen voor betere prestaties",
    category: "Database",
    priority: "high",
    dueDate: "2025-04-22T08:45:00Z",
  },
  {
    title: "Error handling verbeteren",
    description: "Implementeer betere foutafhandeling en logging",
    category: "Development",
    priority: "medium",
    dueDate: "2025-04-25T16:00:00Z",
  },
  {
    title: "Dashboard UI ontwerpen",
    description:
      "Ontwerp een gebruiksvriendelijke interface voor het dashboard",
    category: "Design",
    priority: "low",
    dueDate: "2025-04-28T13:00:00Z",
  },
  {
    title: "Feedback verzamelen",
    description: "Verzamel feedback van testers en verbeter de API",
    category: "Management",
    priority: "medium",
    dueDate: "2025-05-01T17:30:00Z",
  },
  {
    title: "API deployen naar productie",
    description: "Host de API op Render en test live functionaliteit",
    category: "Deployment",
    priority: "high",
    dueDate: "2025-05-05T11:00:00Z",
  },
  {
    title: "Maak een REST API",
    description: "Ontwikkel een takenbeheer API met Node.js",
    category: "Development",
    priority: "high",
    dueDate: "2025-06-10T12:00:00Z", // Verleden
  },
  {
    title: "Schrijf API-documentatie",
    description: "Maak een duidelijke README voor de API",
    category: "Documentation",
    priority: "medium",
    dueDate: "2025-06-16T15:00:00Z",
  },
  {
    title: "Implementeer authenticatie",
    description: "Voeg JWT-tokenverificatie toe aan de API",
    category: "Security",
    priority: "high",
    dueDate: "2025-06-17T09:30:00Z",
  },
  {
    title: "Front-end koppelen aan API",
    description: "Verbind de React-app met de API",
    category: "Development",
    priority: "high",
    dueDate: "2025-06-18T14:00:00Z",
  },
  {
    title: "Unit tests schrijven",
    description: "Schrijf Jest-tests voor de belangrijkste API-routes",
    category: "Testing",
    priority: "medium",
    dueDate: "2025-06-19T10:00:00Z",
  },
  {
    title: "Database-optimalisatie",
    description: "Optimaliseer MongoDB-indexen voor betere prestaties",
    category: "Database",
    priority: "high",
    dueDate: "2025-06-20T08:45:00Z",
  },
  {
    title: "Error handling verbeteren",
    description: "Implementeer betere foutafhandeling en logging",
    category: "Development",
    priority: "medium",
    dueDate: "2025-06-21T16:00:00Z",
  },
  {
    title: "Dashboard UI ontwerpen",
    description:
      "Ontwerp een gebruiksvriendelijke interface voor het dashboard",
    category: "Design",
    priority: "low",
    dueDate: "2025-06-22T13:00:00Z",
  },
  {
    title: "Feedback verzamelen",
    description: "Verzamel feedback van testers en verbeter de API",
    category: "Management",
    priority: "medium",
    dueDate: "2025-06-23T17:30:00Z",
  },
  {
    title: "API deployen naar productie",
    description: "Host de API op Render en test live functionaliteit",
    category: "Deployment",
    priority: "high",
    dueDate: "2025-06-24T11:00:00Z",
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI!);
  await Task.deleteMany(); // Clear first (optional, ensures no duplicates)
  await Task.insertMany(data);
  console.log("🌱 Seeded database with sample tasks.");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
