require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { connectDB } = require("./src/db/connect");

const app = express();

// --- Middleware ---
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// --- Health check ---
app.get("/health", (req, res) => res.json({ ok: true }));

// --- Routes ---
app.use("/facts", require("./src/routes/facts"));

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server listening on 0.0.0.0:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message || err);
    process.exit(1);
  }
})();
