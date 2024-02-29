import WebSocket from 'ws';
import dotenv from 'dotenv';
import { setupEndlessReconnection } from '../utils/reconnect';

// Load environment variables
dotenv.config();

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
      console.log('Connected to MemGPT server');
      // Handle open connection
    });

    this.ws.on('message', (message) => {
      console.log('Message from MemGPT server:', message);
      // Handle incoming messages from MemGPT server
    });

    this.ws.on('close', () => {
      console.log('Connection to MemGPT server closed. Attempting to reconnect...');
      this.reconnect();
    });

    this.ws.on('error', (error) => {
      console.error('Connection error:', error);
      this.ws.close(); // Ensure connection is closed before reconnecting
    });

    this.reconnect = setupEndlessReconnection(() => this.connect());
  }

  // Method to send message to MemGPT server
  sendMessage(message) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      console.log('WebSocket is not open. Message not sent:', message);
      // You might queue messages here or handle this scenario according to your needs
    }
  }
}

const serverConnector = new ServerConnector();
