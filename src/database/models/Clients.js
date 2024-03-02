import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  registrationDate: { type: Date, default: Date.now },
});

const Client = mongoose.model('Client', clientSchema);

export default Client;