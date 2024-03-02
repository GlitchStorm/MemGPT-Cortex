import dotenv from 'dotenv';
import ConnectionManager from './network/connectionManager.js';
import { loadUUIDs } from './utils/uuid.js';

dotenv.config()

ConnectionManager.addServerConnection('MemGPTServer', { url: process.env.MEMGPT_SERVER_WS_URL})//TODO: Adjust to support checking for UUID and auto-assigning if non-existent

loadUUIDs().then(() => {
    logger.info('Application is ready')
})