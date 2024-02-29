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
      return 5000; // Reconnect every 5 seconds
    }
  
    return reconnect;
  }