const express     = require('express');
const { protect } = require('../middleware/authMiddleware');
const Activity    = require('../models/Activity');

const router = express.Router();

/* ── POST /api/price-suggestions/generate ──────── */
router.post('/generate', protect, async (req, res) => {
  const { product, condition, currency } = req.body;

  if (!product || product.trim().length < 2)
    return res.status(400).json({ message: 'Please provide a valid product.' });

  const systemPrompt = `You are an expert pricing consultant for small businesses and independent sellers.

Generate smart, research-backed pricing suggestions for the given product. Return ONLY valid JSON with EXACTLY this structure (no markdown, no backticks):

{
  "currency_symbol": "single character symbol for the currency (e.g. £, $, €, ₹, ₨)",
  "recommended": {
    "min": <lowest reasonable price as a number>,
    "max": <highest reasonable price as a number>,
    "optimal": <single best price as a number>,
    "tagline": "Short phrase (max 6 words) describing the recommended range benefit, e.g. 'Best balance of profit & competitiveness'"
  },
  "calculation": {
    "market_average": <base market average price as a number>,
    "condition_adjustment": <price adjustment for new/used condition, can be negative, as a number>,
    "handmade_value": <premium added for handmade/artisan quality, 0 if not applicable, as a number>,
    "demand_factor": "One word: High, Neutral, or Low — current demand level for this product"
  },
  "market_comparison": {
    "average": <average price of similar products on market as a number>,
    "lowest": <lowest competitor price as a number>,
    "highest": <highest competitor price as a number>
  },
  "tips": [
    "Actionable pricing tip 1 specific to this product",
    "Actionable pricing tip 2 specific to this product",
    "Actionable pricing tip 3 specific to this product"
  ],
  "market_insight": "2-3 sentences about market positioning, competitive landscape, and demand for this product type."
}

Rules:
- All prices must be in ${currency || 'USD'} currency
- Prices must be realistic numbers (not strings)
- condition_adjustment: positive for new/handmade, negative or 0 for used
- handmade_value: only add if product is handmade or artisan
- demand_factor must be exactly one of: High, Neutral, Low
- Tips must be specific to this exact product, not generic advice
- market_insight must reference actual market conditions for this product`;

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model:           'gpt-4o-mini',
        temperature:     0.6,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user',   content: `Product: ${product.trim()}\nCondition: ${condition || 'New'}\nCurrency: ${currency || 'USD'}` },
        ],
      }),
    });

    if (!openaiRes.ok) {
      const err = await openaiRes.json();
      console.error('OpenAI error:', err);
      return res.status(502).json({ message: 'AI service error. Please try again.' });
    }

    const aiData = await openaiRes.json();
    const raw    = aiData.choices?.[0]?.message?.content;
    if (!raw) return res.status(502).json({ message: 'Empty response. Please try again.' });

    const suggestions = JSON.parse(raw);

    Activity.create({
      userId: req.user._id,
      type:   'product_description',
      label:  `Generated price suggestions for "${product.trim()}"`,
    }).catch((e) => console.error('Activity save error:', e.message));

    res.json({ product: product.trim(), condition, currency, suggestions });

  } catch (err) {
    console.error('Price suggestion error:', err.message);
    res.status(500).json({ message: 'Failed to generate suggestions. Please try again.' });
  }
});

module.exports = router;
