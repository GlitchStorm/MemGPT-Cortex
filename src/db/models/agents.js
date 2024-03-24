import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
    agentId: {
        type: String,
        required: true
    },
    agentName: {
        type: String,
        required: true
    },
    metadata: {
        type: Object
    }
  });
  
  export default mongoose.model('Agents', agentSchema);