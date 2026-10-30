import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

if (!process.env.MONGODB_URI) {
  console.error("Missing MONGODB_URI. Create backend/.env (see .env.example) or set it in your host's environment settings.");
  process.exit(1);
}

try {
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  console.log("MongoDB connected");
} catch (err) {
  console.error("MongoDB connection failed:", err.message);
  process.exit(1);
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`API running on port ${port}`));
