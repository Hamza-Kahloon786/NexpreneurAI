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
      enum:     ['business_plan', 'product_description'],
      required: true,
    },
    label: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Activity', activitySchema);
