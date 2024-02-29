import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  connectionAddress: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
});

const Client = mongoose.model('Client', clientSchema);

export default Client;