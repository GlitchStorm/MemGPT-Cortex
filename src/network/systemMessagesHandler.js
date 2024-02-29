import systemQueue from '../queue/systemQueue.js';
import CollectedData from '../database/models/CollectedData.js';

function enqueueSystemMessage(message) {
    systemQueue.add(message);
};

//TODO: Queue flush and concat for payload delivery

async function saveCollectedData(data) {
    const newData = new CollectedData(data);
    await newData.save();
};

export default { enqueueSystemMessage, saveCollectedData };