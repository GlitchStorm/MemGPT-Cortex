import dotenv from 'dotenv';
dotenv.config();
import utils from './lib/utils.js'
import connectDB from './db/index.js';
import Connection from './db/models/connections.js';
import Agents from './db/models/agents.js';
import memgpt from './api/memgpt.cjs';
import { v4 as uuidv4 } from 'uuid';

console.log("Initializing logger...")
global.logger = utils.createLogger();
logger.info("logger initialized");
logger.info("Connecting to database...");
await connectDB();
logger.info("Loading connections...")
await loadConnections();
logger.info("Loading agents...")
await loadAgents();

// Initial db query to retrieve needed information to memory
async function loadConnections() {
    try {
        const connection = await Connection.find();
        // Load connections into memory
        global.connections = connection;
        logger.info(`Loaded ${connections.length} connections from DB`);
    } catch (error) {
        logger.error(`Error loading connections from DB: ${error}`);
    }
}

async function loadAgents() {
  try {
    const agents = await Agents.find();

    // Load agents into memory
    global.agents = agents;

    logger.info(`Loaded ${agents.length} agents from DB`);
  } catch (error) {
    logger.error(`Error loading agents from DB: ${error}`);
  }
}

// Initialize connection to memgpt server
const firstLaunch =  !connections.some(conn => conn.type === 'memgpt');
if (firstLaunch) {
  logger.info('First time launch detected. Initializing connection to MemGPT server...');
  await memgpt.memgptInit().then(async (user) => {
    logger.info(`First time MemGPT connection established successfully. New user ID: ${user.data.user_id} with api key: ${user.data.api_key}`);
    logger.info('Saving to database...');
    const newMemgptConnection = new Connection({
        connectionId: uuidv4(),
        type: 'memgpt',
        connectionUrl: process.env.MEMGPT_URL,
        metadata: {
          userId: user.data.user_id,
          apiKey: user.data.api_key
        }
    });

    try {
        await newMemgptConnection.save();
        logger.info('MemGPT connection saved to database successfully.');
    } catch (error) {
        logger.error(`Error saving MemGPT connection to DB: ${error}`);
        throw error;
    }
});
} else {
    logger.info('Existing MemGPT connection found. Skipping initialization.');
}