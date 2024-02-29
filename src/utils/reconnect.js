import logger from './logger.js'

// Enhanced reconnection function with endless retry mode
export function setupEndlessReconnection(connectFunction) {
    function reconnect() {
      setTimeout(() => {
        logger.info(`Attempting to reconnect...`);
        connectFunction();
      }, calculateReconnectionDelay());
    }
  
    function calculateReconnectionDelay() {
      return 15000; // Reconnect every 15 seconds
    }
  
    return reconnect;
  }