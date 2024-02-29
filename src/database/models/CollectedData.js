const mongoose = require('mongoose');

const CollectedDataSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true }, // e.g., 'email', 'notification', 'health_data'
  content: { type: mongoose.Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('CollectedData', CollectedDataSchema);