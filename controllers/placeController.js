const Place = require('../models/place');
const User = require('../models/user');
const City = require('../models/city');
const State = require('../models/state')

async function createPlace(req, res) {
    try {
        const {
            name,
            description,
            number_rooms,
            number_bathrooms,
            max_guest,
            price_by_night,
            latitude,
            longitude,
            user_id,
            state_name,
            city_name
        } = req.body;

        
        // Find the user by ID
        const user = await User.findById(user_id);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the state exists
        const state = await State.findOne({ name: state_name });

        // Handle the case when the state does not exist
        if (!state) {
            return res.status(404).json({ message: "State not found" });
        }

        // Check if the city exists in the specified state
        const city = await City.findOne({ name: city_name });

        // Handle the case when the city does not exist in the specified state
        if (!city) {
            return res.status(404).json({ message: "City not found in the specified state" });
        }

        // Create a place with references to user, city, and state
        const place = await Place.create({
            name,
            description,
            number_bathrooms,
            number_rooms,
            latitude,
            longitude,
            price_by_night,
            max_guest,
            user: user._id,
            city: city._id,
            state: state._id
        });

        // Populate the state and city details in the response
        const populatedPlace = await Place.findById(place._id)
            .populate('user', 'email')
            .populate('city', 'name')
            .populate('state', 'name');

        res.status(200).json({ message: "Successfully added place", place: populatedPlace });
    } catch (err) {
        console.error("Error creating a place:", err);
        res.status(500).json({ message: "Error creating a place" });
    }
}


async function updatePlace(req, res) {
    try {
        const { id } = req.params; // Assuming you have the place ID in the request params
        const { name, description, number_rooms, number_bathrooms, max_guest, price_by_night, latitude, longitude, user_id, city_id } = req.body;

        // Assuming you have models for User and City
        const user = await User.findById(user_id);
        const city = await City.findById(city_id);

        // Find the place by ID and update its properties
        const updatedPlace = await Place.findByIdAndUpdate(
            id,
            {
                user: user._id,
                city: city._id,
                name,
                description,
                number_bathrooms,
                number_rooms,
                latitude,
                longitude,
                price_by_night,
                max_guest
            },
            { new: true } // This ensures you get the updated document as a result
        );

        if (!updatedPlace) {
            return res.status(404).json({ message: "Place not found" });
        }

        res.status(200).json({ message: "Successfully updated place", place: updatedPlace });
    } catch (err) {
        console.error("Error updating place", err);
        res.status(500).json({ message: "Error updating place" });
    }
}


async function getPlace(req, res) {
    try {
        const { name } = req.params;

        if (!name) {
            return res.status(400).json({ message: "City name is required" });
        }

        const place = await Place.findOne({ name });

        if (!place) {
            return res.status(404).json({ message: `Place with name ${name} not found` });
        }

        return res.status(200).json({ place });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


async function getAllPlace(req, res) {
    try {
        const places = await Place.find();

        if (!places || places.length === 0) {
            return res.status(404).json({ message: "No places found" });
        }

        return res.status(200).json({ places });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


async function deletePlace(req, res) {
    try {
        const { name } = req.params;

        if (!name) {
            return res.status(400).json({ message: "Please provide a valid place name" });
        }

        const deletedPlace = await Place.findOneAndDelete({ name });

        if (!deletedPlace) {
            return res.status(404).json({ message: `Place with name ${name} not found` });
        }

        return res.status(200).json({ message: "Place deleted successfully", deletedPlace });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports = { createPlace, updatePlace, getPlace, getAllPlace, deletePlace };