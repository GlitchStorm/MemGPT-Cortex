import dotenv from 'dotenv';
import ServerConnector from './broker/serverConnector';
import ClientConnector from './broker/clientConnector';

dotenv.config()

const serverConnector = new ServerConnector();
const clientConnector = new ClientConnector();