//handles queuing of messages from the server in case of connection loss to the client
import bull from 'bull'

const Queue = bull;
const clientQueue = new Queue('client-messages', 'redis://127.0.0.1:6379')

export default clientQueue;