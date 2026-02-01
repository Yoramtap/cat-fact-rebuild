 require("dotenv").config();
 const mongoose = require("mongoose");
 const fs = require("fs");
 const path = require("path");
+const Fact = require("../src/models/Fact");

 const MONGODB_URI = process.env.MONGODB_URI;
 if (!MONGODB_URI) {
   console.error("❌ MONGODB_URI missing in .env");
   process.exit(1);
 }
-
-// Define the Fact schema (minimal, same as API)
-const FactSchema = new mongoose.Schema(
-  {
-    text: { type: String, required: true, trim: true },
-    type: { type: String, default: "cat", index: true }
-  },
-  { timestamps: true }
-);
-
-const Fact = mongoose.models.Fact || mongoose.model("Fact", FactSchema);

 async function seed() {
   await mongoose.connect(MONGODB_URI);
