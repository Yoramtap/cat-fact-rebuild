require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// --- Middleware ---
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// --- Health check ---
app.get("/health", (req, res) => res.json({ ok: true }));

// --- MongoDB ---
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in environment variables");
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// --- Routes (you'll implement these in your stripped repo) ---
// app.use("/facts", require("./src/routes/facts"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on 0.0.0.0:${PORT}`);
});