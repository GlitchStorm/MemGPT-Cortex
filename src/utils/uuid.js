import Client from '../database/models/Clients.js';
import Agent from '../database/models/Agents.js';
import logger from './logger.js';

export const clientsMap = new Map();
export const agentsMap = new Map();

export async function loadUUIDs() {
    try {
        const clients = await Client.find();
        clients.forEach(client => {
            clientsMap.set(client.uuid, client)
        });

        const agents = await Agent.find();
        agents.forEach(agent => {
            agentsMap.set(agent.uuid, agent)
        });

        logger.info('UUIDs loaded into memory');
    } catch (error) {
        logger.error('Failed to load UUIDs:', error);
    }
}

export default { loadUUIDs, clientsMap, agentsMap };