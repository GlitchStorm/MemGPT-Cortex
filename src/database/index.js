import mongoose from 'mongoose';
import logger from '../utils/logger.js';

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', logger.error('Database error: ' + error));
db.once('open', function(){
    logger.info('Connected to MongoDB');
});

export default mongoose;