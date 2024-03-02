import mongoose from 'mongoose';

const serverSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
});

const Server = mongoose.model('Server', serverSchema);

export default Server;