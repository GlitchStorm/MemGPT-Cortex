import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    content: String,
    senderId: {type: String, required: true},
    recipientId: {type: String, required: true},
    senderType: {type: String, required: true},
    recipientType: {type: String, required: true},
    metadata: {
        type: Map,
        of: String,
    },
    createdAt: { type: Date, default: Date.now}
});

const Message = mongoose.model('Message', messageSchema)

export default Message;