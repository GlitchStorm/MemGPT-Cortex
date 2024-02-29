import WebSocket, { WebSocketServer } from 'ws';
import fs from 'fs';
import https from 'https';
import logger from '../utils/logger.js'


const serverOptions = {
    cert: fs.readFileSync('C:/key/myserver.crt'),
    key: fs.readFileSync('C:/key/myserver.key'),
};

class ClientConnector {
    constructor(port) {
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
                //handle incoming messages
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
}

export default ClientConnector;