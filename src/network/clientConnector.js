import { v4 as uuidv4 } from 'uuid';
import WebSocketServer from 'ws';
import fs from 'fs';
import https from 'https';
import logger from '../utils/logger.js'
import { clientsMap } from '../utils/uuid.js';
import mongoose from 'mongoose';
import Message from '../database/models/Message.js';


const serverOptions = {
    cert: fs.readFileSync('C:/key/myserver.crt'),
    key: fs.readFileSync('C:/key/myserver.key'),
};

class ClientConnector {
    constructor() {
        this.port = process.env.BROKER_WSS_PORT;
        this.wss = null;
        this.initWSS();
    }

    initWSS() {
        const server = https.createServer(serverOptions);
        this.wss = new WebSocketServer( { server } );

        this.wss.on('connection', (ws) => {
            logger.info('Client connected');

            ws.on('message', (message) => {
                logger.info('Received message from client:', message);

                const parsedMessage = JSON.parse(message)
                //Check if this is a first time connection or an existing client
                if (parsedMessage.action === 'new_client') {
                    ws.send(JSON.stringify({ action: 'assign_uuid', uuid: this.handleNewClientConnection}));
                } else if (parsedMessage.action === 'existing_client') {
                    //Ensure that client UUID exists in database
                    const client = clientsMap.get(parsedMessage.uuid);
                    if (client) {
                        logger.info(`Client reconnected with UUID: ${parsedMessage.uuid}`)
                    } else {
                        logger.error(`Unknown client UUID: ${parsedMessage.uuid}`)
                    }
                }
                //handle regular messages here
            });

            ws.on('close', () => {
                logger.error('Client disconnected')
            })

            //send messages here with ws.send()
        });

        server.listen(this.port, () => {
            logger.info(`WSS server listening on port ${this.port}`);
        });
    }

    handleNewClientConnection(ws) {
        //generate a new UUID for the client
        const clientUUID = uuidv4();
        clientsMap.set(clientUUID, ws);
        logger.info(`New client connected with UUID: ${clientUUID}`);
        // Save the new client connection with UUID to the database
        const newClient = new Client({
          uuid: clientUUID,
        });
        newClient.save((err, savedClient) => {
          if (err) {
            logger.error('Error saving new client:', err);
          } else {
            logger.info(`Client saved with UUID: ${savedClient.uuid}`);
          }
        });
        return clientUUID;
    }
}

export default ClientConnector;