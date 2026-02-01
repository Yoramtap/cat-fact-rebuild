const Fact = require("../models/Fact");

/**
 * Returns random facts filtered by type.
 * Keeps current behavior: amount clamped to 1..50, type default "cat".
 */
async function getRandomFacts({ amount = 1, type = "cat" }) {
  const safeAmount = Math.max(1, Math.min(50, Number(amount || 1)));
  const safeType = String(type || "cat");

  const facts = await Fact.aggregate([
    { $match: { type: safeType } },
    { $sample: { size: safeAmount } },
    { $project: { text: 1, type: 1 } },
  ]);

  return facts;
}

module.exports = { getRandomFacts };
