import mongoose from 'mongoose';

const connectionSchema = new mongoose.Schema({
  connectionId: {
    type: String,
    required: true,
    unique: true // Ensure unique connection IDs
  },
  type: {
    type: String,
    required: true,
    enum: ['client', 'server', 'memgpt'] // Enforce valid connection types
  },
  createdAt: {
    type: Date,
    default: Date.now // Set current timestamp by default
  },
  connectionUrl: {
    type: String
  },
  connectionPort: {
    type: Number
  },
  clientAddress: {
    type: String
  },
  tags: {
    type: [String]
  },
  metadata: {
    type: Object
  },
});

export default mongoose.model('Connection', connectionSchema);