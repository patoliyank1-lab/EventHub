import { app } from "@/app";
import { config } from "@/config/config";
import { connectDb } from "@/config/database";

const startServer = async () => {
  try {
    // Connect to database
    await connectDb();

    // Start server
    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
      console.log(`📝 Environment: ${config.nodeEnv}`);
      console.log(`🔗 Health: http://localhost:${config.port}/health`);
    });
  } catch (error) {
    console.error({ error }, "Failed to start server");
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason) => {
  console.error({ reason }, "Unhandled Rejection");
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error({ error }, "Uncaught Exception");
  process.exit(1);
});

startServer();
