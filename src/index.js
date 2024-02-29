import dotenv from 'dotenv';
import ServerConnector from './network/serverConnector.js';
import ClientConnector from './network/clientConnector.js';

dotenv.config()

const serverConnector = new ServerConnector();
const clientConnector = new ClientConnector();