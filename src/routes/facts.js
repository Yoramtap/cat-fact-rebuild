const express = require("express");
const Fact = require("../models/Fact");

const router = express.Router();

// GET /facts/random?amount=1&type=cat
router.get("/random", async (req, res) => {
  const amount = Math.max(1, Math.min(50, Number(req.query.amount || 1)));
  const type = String(req.query.type || "cat");

  const facts = await Fact.aggregate([
    { $match: { type } },
    { $sample: { size: amount } },
    { $project: { text: 1, type: 1 } },
  ]);

  res.json({ facts });
});

module.exports = router;
