import dotenv from 'dotenv';
import ServerConnector from './broker/serverConnector.js';
import ClientConnector from './broker/clientConnector.js';

dotenv.config()

const serverConnector = new ServerConnector();
const clientConnector = new ClientConnector();