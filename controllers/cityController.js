const City = require('../models/city');
const State = require('../models/state');

async function createCity(req, res) {
    try {
        const { state_name, name } = req.body;

        // Validate input fields
        if (!state_name || !name) {
            return res.status(400).json({ message: 'Both state_name and name are required in the request body' });
        }

        // Check if the state with the provided name exists
        const existingState = await State.findOne({ name: state_name });

        if (!existingState) {
            return res.status(404).json({ message: 'State not found with the provided name' });
        }

        // Use the retrieved state_id when creating the city
        const city = await City.create({
            state: existingState._id, // Using state instead of state_id
            name
        });

        // Populate the state field to include the state information
        const populatedCity = await City.findById(city._id).populate('state', 'name');

        res.status(200).json({ message: 'City created successfully', city: populatedCity });
    } catch (err) {
        console.error('Error creating a city', err);
        res.status(500).json({ message: 'Error creating a city' });
    }
}

async function getCity(req, res) {
    try {
        const cities = await City.find();
        res.status(200).json({ cities });
    } catch (error) {
        console.error("Error getting cities", error);
        res.status(500).json({ message: "Error getting cities" });
    }
}

async function getACity(req, res) {
    try {
        const { name } = req.params;
        if (!name){
            res.status(400).json({message: "Kindly enter a city name"});
        }
        const foundCity = await City.findOne({ name });
        if (!foundCity) {
            res.status(404).json({message: `city ${name} doesn't exist`});
        }
        return res.status(200).json({ foundCity })
    } catch (error) {
        console.error("Error finding city", error);
        return res.status(500).json({ message: error })
    }
}

async function updateCity(req, res) {
    try {
        const { id } = req.params;
        const { state_id, name } = req.body;

        const updatedCity = await City.findByIdAndUpdate(
            id,
            { state_id, name },
            { new: true }
        );

        if (!updatedCity) {
            return res.status(404).json({ message: "City not found" });
        }

        res.status(200).json({ message: "City updated successfully", city: updatedCity });
    } catch (error) {
        console.error("Error updating city", error);
        res.status(500).json({ message: "Error updating city" });
    }
}

async function deleteCity(req, res) {
    try {
        const { id } = req.params;
        const deletedCity = await City.findByIdAndDelete(id);

        if (!deletedCity) {
            return res.status(404).json({ message: "City not found" });
        }

        res.status(200).json({ message: "City deleted successfully", city: deletedCity });
    } catch (error) {
        console.error("Error deleting city", error);
        res.status(500).json({ message: "Error deleting city" });
    }
}

module.exports = {
    createCity,
    getACity,
    getCity,
    updateCity,
    deleteCity
};
