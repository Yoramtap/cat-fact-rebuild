require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI missing in .env");
  process.exit(1);
}

// Define the Fact schema (minimal, same as API)
const FactSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    type: { type: String, default: "cat", index: true }
  },
  { timestamps: true }
);

const Fact = mongoose.models.Fact || mongoose.model("Fact", FactSchema);

async function seed() {
  await mongoose.connect(MONGODB_URI);

  const count = await Fact.countDocuments();
  if (count > 0) {
    console.log(`⚠️ Facts collection already has ${count} records. Skipping seed.`);
    await mongoose.disconnect();
    return;
  }

  const filePath = path.join(__dirname, "..", "data", "facts.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const facts = JSON.parse(raw);

  await Fact.insertMany(facts);
  console.log(`✅ Inserted ${facts.length} facts`);

  await mongoose.disconnect();
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});