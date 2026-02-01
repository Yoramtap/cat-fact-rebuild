require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { connectDB } = require("./src/db/connect");

function createApp() {
  const app = express();

  // Middleware
  app.use(morgan("dev"));
  app.use(cors());
  app.use(express.json());

  // Routes
  app.get("/health", (_req, res) => res.json({ ok: true }));
  app.use("/facts", require("./src/routes/facts"));

  // Error handling (keep last)
  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  });

  return app;
}

function listen(app) {
  const port = process.env.PORT || 3000;

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on 0.0.0.0:${port}`);
  });
}

async function main() {
  await connectDB();

  const app = createApp();
  listen(app);
}

main().catch((err) => {
  console.error("❌ Failed to start server:", err.message || err);
  process.exit(1);
});
