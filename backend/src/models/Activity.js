const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true,
      index:    true,
    },
    type: {
      type:     String,
      enum:     ['business_plan', 'product_description', 'price_suggestion'],
      required: true,
    },
    label: { type: String, required: true },
    // Saved so the user can re-open a past result from My Progress.
    // Older activities (created before this was added) have neither.
    input:  { type: mongoose.Schema.Types.Mixed },
    result: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Activity', activitySchema);
