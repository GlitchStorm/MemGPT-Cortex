// Enhanced reconnection function with endless retry mode
export function setupEndlessReconnection(connectFunction) {
    function reconnect() {
      setTimeout(() => {
        console.log(`Attempting to reconnect...`);
        connectFunction();
      }, calculateReconnectionDelay());
    }
  
    function calculateReconnectionDelay() {
      return 5000; // Reconnect every 5 seconds
    }
  
    return reconnect;
  }