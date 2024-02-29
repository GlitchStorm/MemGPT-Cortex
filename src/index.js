import dotenv from 'dotenv';
import ServerConnector from './network/serverConnector.js';
import ClientConnector from './network/clientConnector.js';
import { loadUUIDs } from './utils/uuid.js';

dotenv.config()

const serverConnector = new ServerConnector();
const clientConnector = new ClientConnector();

loadUUIDs().then(() => {
    logger.info('Application is ready')
})