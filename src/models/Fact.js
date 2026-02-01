const mongoose = require("mongoose");

const FactSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    type: { type: String, default: "cat", index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Fact || mongoose.model("Fact", FactSchema);
