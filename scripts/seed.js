require("dotenv").config();

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Fact = require("../src/models/Fact");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI missing in .env");
  process.exit(1);
}

async function seed() {
  await mongoose.connect(MONGODB_URI);

  const count = await Fact.countDocuments();
  if (count > 0) {
    console.log(`✅ facts collection already has ${count} documents. Skipping seed.`);
    process.exit(0);
  }

  const jsonPath = path.join(__dirname, "..", "data", "facts.json");
  const raw = fs.readFileSync(jsonPath, "utf-8");
  const facts = JSON.parse(raw);

  await Fact.insertMany(facts);
  console.log(`✅ Inserted ${facts.length} facts`);

  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
