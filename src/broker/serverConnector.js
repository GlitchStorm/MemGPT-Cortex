import WebSocket from 'ws';
import { setupEndlessReconnection } from '../utils/reconnect.js';
import logger from '../utils/logger.js';

class ServerConnector {
  constructor() {
    // Use the WS URL from the .env file or default if not specified
    this.memgptServerWsUrl = process.env.MEMGPT_SERVER_WS_URL;
    this.ws = null;
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.memgptServerWsUrl);

    this.ws.on('open', () => {
      logger.info('Connected to MemGPT server');
      // Handle open connection
    });

    this.ws.on('message', (message) => {
      logger.info('Message from MemGPT server:', message);
      // Handle incoming messages from MemGPT server
    });

    this.ws.on('close', () => {
      logger.error('Connection to MemGPT server closed. Attempting to reconnect...');
      this.reconnect();
    });

    this.ws.on('error', (error) => {
      logger.error('Connection error:', error);
      this.ws.close(); // Ensure connection is closed before reconnecting
    });

    this.reconnect = setupEndlessReconnection(() => this.connect());
  }

  // Method to send message to MemGPT server
  sendMessage(message) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      logger.error('WebSocket is not open. Message not sent:', message);
      // You might queue messages here or handle this scenario according to your needs
    }
  }
}

export default ServerConnector;