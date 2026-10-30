import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import enquiryRoutes from "./routes/enquiries.js";

const app = express();
app.set("trust proxy", 1); // correct client IPs behind Render/Railway/etc.
app.use(helmet());

const origins = (process.env.CLIENT_ORIGIN || (process.env.NODE_ENV === "production" ? "" : "http://localhost:5173"))
  .split(",").map((s) => s.trim().replace(/\/$/, "")).filter(Boolean);
app.use(cors({
  origin: (origin, cb) => (!origin || origins.includes(origin) ? cb(null, true) : cb(new Error("Origin not allowed"))),
}));

app.use(express.json({ limit: "20kb" }));
app.get("/", (_req, res) => res.json({ service: "Promise Logistics API", ok: true }));
app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api/enquiries", rateLimit({ windowMs: 15 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false }), enquiryRoutes);

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (err.message === "Origin not allowed") return res.status(403).json({ error: "Origin not allowed" });
  if (err.type === "entity.parse.failed") return res.status(400).json({ error: "Invalid JSON" });
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

export default app;
