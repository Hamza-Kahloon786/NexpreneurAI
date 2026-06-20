const express     = require('express');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

/* ── POST /api/business-plan/generate ──────────── */
router.post('/generate', protect, async (req, res) => {
  const { idea } = req.body;

  if (!idea || idea.trim().length < 3)
    return res.status(400).json({ message: 'Please provide a valid business idea.' });

  const systemPrompt = `You are an expert business coach helping beginners start their first business.

Generate a complete business plan. Return ONLY valid JSON with EXACTLY this structure (no markdown, no backticks):

{
  "what_you_need": {
    "subtitle": "Essential resources required to start your business",
    "categories": [
      { "category": "Raw Materials", "items": ["3-4 specific items for this exact business"] },
      { "category": "Tools & Equipment", "items": ["3-4 specific tools needed"] },
      { "category": "Branding Essentials", "items": ["Brand name", "Logo", "Label design"] },
      { "category": "Operations", "items": ["3-4 operational requirements"] }
    ]
  },
  "startup_guide": {
    "subtitle": "Follow these steps to launch your business from scratch",
    "steps": [
      "Step 1 — write a complete action sentence of 10-15 words explaining exactly what to do and why",
      "Step 2 — write a complete action sentence of 10-15 words explaining exactly what to do and why",
      "Step 3 — write a complete action sentence of 10-15 words explaining exactly what to do and why",
      "Step 4 — write a complete action sentence of 10-15 words explaining exactly what to do and why",
      "Step 5 — write a complete action sentence of 10-15 words explaining exactly what to do and why",
      "Step 6 — write a complete action sentence of 10-15 words explaining exactly what to do and why",
      "Step 7 — write a complete action sentence of 10-15 words explaining exactly what to do and why",
      "Step 8 — write a complete action sentence of 10-15 words explaining exactly what to do and why"
    ]
  },
  "branding": {
    "subtitle": "Build a brand identity that connects with your audience",
    "brand_vibe": ["Adjective1", "Adjective2", "Adjective3", "Adjective4"],
    "colors": [
      { "name": "Primary color name", "hex": "#hexcode" },
      { "name": "Secondary color name", "hex": "#hexcode" },
      { "name": "Accent color name", "hex": "#hexcode" }
    ],
    "brand_names": ["Name1", "Name2", "Name3"],
    "packaging_idea": "One sentence describing the packaging concept"
  },
  "where_to_sell": {
    "subtitle": "The best channels to reach your first customers",
    "platforms": [
      { "platform": "Instagram", "description": "How to use Instagram for this specific business" },
      { "platform": "Facebook Marketplace", "description": "How Facebook helps this business" },
      { "platform": "WhatsApp", "description": "How WhatsApp helps manage this business" }
    ]
  },
  "first_10_actions": {
    "subtitle": "Do these this week to launch faster",
    "actions": [
      "Action 1 — write a complete action sentence of 10-15 words explaining exactly what to do",
      "Action 2 — write a complete action sentence of 10-15 words explaining exactly what to do",
      "Action 3 — write a complete action sentence of 10-15 words explaining exactly what to do",
      "Action 4 — write a complete action sentence of 10-15 words explaining exactly what to do",
      "Action 5 — write a complete action sentence of 10-15 words explaining exactly what to do",
      "Action 6 — write a complete action sentence of 10-15 words explaining exactly what to do",
      "Action 7 — write a complete action sentence of 10-15 words explaining exactly what to do",
      "Action 8 — write a complete action sentence of 10-15 words explaining exactly what to do",
      "Action 9 — write a complete action sentence of 10-15 words explaining exactly what to do",
      "Action 10 — write a complete action sentence of 10-15 words explaining exactly what to do"
    ]
  },
  "image_keyword": "2-3 very specific words that describe the product/service visually for image search (e.g. 'cricket bat training', 'scented candles jars', 'homemade cake bakery')"
}

Rules:
- Steps and actions: MUST be 10-15 words each — full sentences, actionable, specific to the EXACT idea (e.g. "Research local suppliers for raw soy wax and essential oils at wholesale prices")
- What_you_need items: 3-6 words, concise and specific
- Brand names: creative, memorable, 1-2 words
- Colors: use warm, appealing hex codes that match the business type
- image_keyword: must be SPECIFIC to this exact business idea, not generic`;

  try {
    /* ── 1. Generate plan with OpenAI ── */
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
          { role: 'user',   content: `My business idea: ${idea.trim()}` },
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

    const plan = JSON.parse(raw);

    res.json({ idea: idea.trim(), plan });

  } catch (err) {
    console.error('Business plan error:', err.message);
    res.status(500).json({ message: 'Failed to generate plan. Please try again.' });
  }
});

module.exports = router;