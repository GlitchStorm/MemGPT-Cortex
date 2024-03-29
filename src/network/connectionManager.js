// This manages all active connections
import clientConnector from './clientConnector.js';
import serverConnector from './serverConnector.js';
import Server from '../database/models/serverConnections.js';
import Client from '../database/models/clientConnections.js';
import logger from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';

class ConnectionManager {
    constructor() {
        this.serverConnectors = new Map(); // Key: UUID, Value: serverConnector instance
        this.clientConnectors = new Map(); // Key: UUID, Value: clientConnector instance

        this.initializeConnections();
    }

    async initializeConnections() {
        const serverConnections = await Server.find({});
        serverConnections.forEach(conn => {
            const serverConnector = new serverConnector({ UUID: conn.uuid, label: conn.label });
            this.serverConnectors.set(conn.uuid, { label: conn.label, connector: serverConnector });
        })

        const clientConnections = await Client.find({});
        clientConnections.forEach(conn => {
            const clientConnector = new clientConnector({ UUID: conn.uuid, label: conn.label });
            this.clientConnectors.set(conn.uuid, { label: conn.label, connector: clientConnector });
        })
    }

    async addServerConnection(serverConfig) {
        let { UUID, label } = serverConfig;
        if (this.serverConnectors.has(UUID)) {
            const existingConnection = this.serverConnectors.get(UUID);
            logger.info(`Server connection for ${existingConnection.label} (${UUID}) already exists.`);
            return;
        } else {
            //create new UUID for connection and save to db
            UUID = uuidv4();
            label = label || `Server-${UUID}`;

            const newConnection = new Server({ uuid: UUID, label });
            await newConnection.save();

            const serverConnector = new serverConnector({ UUID, label });
            this.serverConnectors.set(UUID, { label, connector: serverConnector });
            logger.info(`New server connection for ${label} (${UUID}) added and saved to DB.`);
        }
    }

    removeServerConnection(UUID) {
        const connectionToRemove = this.serverConnectors.get(UUID);
        if (connectionToRemove) {
            this.serverConnectors.delete(UUID);
            logger.info(`Server connection for ${connectionToRemove.label} (${UUID}) removed.`);
        }
    }

    getServerConnector(UUID) {
        const connection = this.serverConnectors.get(UUID)
        return connection ? connection.connector : undefined;
    }
    //TODO: Update this function with UUID assignment
    addClientConnection(UUID, clientConfig) {
        const { UUID, label } = clientConfig;
        if (this.clientConnectors.has(UUID)) {
            const existingConnection = this.clientConnectors.get(UUID);
            logger.info(`Client connection for ${existingConnection.label} (${UUID}) already exists.`);
            return;
        }

        const clientConnector = new clientConnector(clientConfig);
        this.clientConnectors.set(UUID, clientConnector);
        logger.info(`Client connection for ${label} (${UUID}) added.`);
    }

    removeClientConnection(UUID) {
        const connectionToRemove = this.clientConnectors.get(UUID);
        if (connectionToRemove) {
            this.clientConnectors.delete(UUID);
            logger.info(`Client connection for ${connectionToRemove.label} (${UUID}) removed.`);
        }
    }

    getClientConnector(UUID) {
        const connection = this.clientConnectors.get(UUID)
        return connection ? connection.connector : undefined;
    }
    // Additional methods as needed for messaging, reconnections, etc.
}

export default new ConnectionManager();