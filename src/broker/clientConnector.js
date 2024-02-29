import WebSocket from 'ws';
import fs from 'fs';
import https from 'https';
import dotenv from 'dontenv';

dotenv.config();


const serverOptions = {
    cert: fs.readFileSync(''),
    key: fs.readFileSync(''),
};

class ClientConnector {
    constructor(port) {
        this.port = process.env.BROKER_WSS_PORT;
        this.wss = null;
        this.initWSS();
    }

    initWSS() {
        const server = https.createServer(serverOptions);
        this.wss = new WebSocket.Server( { server } );

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

const ClientConnector = new ClientConnector()