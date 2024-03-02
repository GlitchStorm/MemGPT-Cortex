// This manages all active connections
import clientConnector from './clientConnector.js';
import serverConnector from './serverConnector.js';
import logger from '../utils/logger.js';

class ConnectionManager {
    constructor() {
        this.serverConnectors = new Map(); // Key: UUID, Value: serverConnector instance
        this.clientConnectors = new Map(); // Key: UUID, Value: clientConnector instance
    }

    addServerConnection(serverConfig) {
        const { UUID, label } = serverConfig;
        if (this.serverConnectors.has(UUID)) {
            const existingConnection = this.serverConnectors.get(UUID);
            logger.info(`Server connection for ${existingConnection.label} (${UUID}) already exists.`);
            return;
        }

        const serverConnector = new serverConnector(serverConfig);
        this.serverConnectors.set(UUID, { label, connector: serverConnector});
        logger.info(`Server connection for ${label} (${UUID}) added.`);
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