//handles queuing of system messages/data payloads when server is offline
import bull from 'bull';

const Queue = bull;
const systemQueue = new Queue('system-messages', 'redis://127.0.0.1:6379');

export default systemQueue;