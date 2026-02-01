const express = require("express");
const { asyncHandler } = require("../utils/asyncHandler");
const { getRandomFacts } = require("../services/factsService");

const router = express.Router();

router.get(
  "/random",
  asyncHandler(async (req, res) => {
    const facts = await getRandomFacts({
      amount: req.query.amount,
      type: req.query.type,
    });
    res.json({ facts });
  })
);

module.exports = router;
