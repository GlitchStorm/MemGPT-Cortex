import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  connectionAddress: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
});

const Agent = mongoose.model('Agent', agentSchema);

export default Agent;