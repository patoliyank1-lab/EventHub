import express from "express";
import cors from "cors";
import helmet from "helmet";
import eventRoute from "@/routes/event.routes"
import authRoute from "@/routes/user.routes"
import { errorHandler } from "./middleware/error-handler";

export const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (_, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api/v1/event", eventRoute);
app.use("/api/v1/auth", authRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Global error handler (must be last)
app.use(errorHandler);
