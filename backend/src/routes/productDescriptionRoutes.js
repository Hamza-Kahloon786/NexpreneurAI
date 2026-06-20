const express     = require('express');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

/* ── POST /api/product-description/generate ──────── */
router.post('/generate', protect, async (req, res) => {
  const { product } = req.body;

  if (!product || product.trim().length < 3)
    return res.status(400).json({ message: 'Please provide valid product details.' });

  const systemPrompt = `You are an expert e-commerce copywriter and SEO specialist helping small business owners create compelling product listings.

Generate product title suggestions and a description. Return ONLY valid JSON with EXACTLY this structure (no markdown, no backticks):

{
  "title_suggestions": [
    "SEO-optimized title 1 — under 80 characters, includes main keywords",
    "SEO-optimized title 2 — different angle or keyword variation",
    "SEO-optimized title 3 — emphasizes a key benefit or material",
    "SEO-optimized title 4 — targets a different buyer intent"
  ],
  "description": "A compelling 3-4 sentence product description covering materials, key benefits, and use cases. Written to convert browsers into buyers. Warm, engaging tone suitable for any marketplace."
}

Rules:
- All 4 titles must be unique and target different search intents or angles
- Titles: specific to the EXACT product, under 80 characters each
- Description: 3-4 sentences, engaging, benefit-first, no generic fluff
- Use natural language, not keyword-stuffed copy`;

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model:           'gpt-4o-mini',
        temperature:     0.7,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user',   content: `My product: ${product.trim()}` },
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

    const result = JSON.parse(raw);

    res.json({ product: product.trim(), description: result });

  } catch (err) {
    console.error('Product description error:', err.message);
    res.status(500).json({ message: 'Failed to generate description. Please try again.' });
  }
});

module.exports = router;
