//handles queuing of messages from clients in case of connection loss to the agent
import bull from 'bull'

const Queue = bull;
const serverQueue = new Queue('server-messages', 'redis://127.0.0.1:6379')

export default serverQueue;