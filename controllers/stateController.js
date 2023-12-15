const State = require('../models/state');

async function createState(req, res) {
    try {
        const { name } = req.body;
        const newState = await State.create({ name });
        res.status(201).json({ message: 'State created successfully', state: newState });
    } catch (error) {
        console.error('Error creating state', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getStates(req, res) {
    try {
        const states = await State.find();
        res.status(200).json({ states });
    } catch (error) {
        console.error('Error getting states', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getStateById(req, res) {
    const { id } = req.params;
    try {
        const state = await State.findById(id);
        if (!state) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.status(200).json({ state });
    } catch (error) {
        console.error('Error getting state by ID', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function updateState(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedState = await State.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedState) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.status(200).json({ message: 'State updated successfully', state: updatedState });
    } catch (error) {
        console.error('Error updating state', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function deleteState(req, res) {
    const { id } = req.params;
    try {
        const deletedState = await State.findByIdAndDelete(id);
        if (!deletedState) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.status(200).json({ message: 'State deleted successfully', state: deletedState });
    } catch (error) {
        console.error('Error deleting state', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    createState,
    getStates,
    getStateById,
    updateState,
    deleteState,
};
