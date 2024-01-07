const Amenity = require('../models/amenity');

// Controller to add a new amenity
const addAmenity = async (req, res) => {
    try {
        const amenities = req.body;

        if (!Array.isArray(amenities)) {
            return res.status(400).json({ error: 'Invalid request. Expecting an array of amenities.' });
        }

        // discarded this style because of validtion error
        // Check if the amenity already exists
        // const existingAmenity = await Amenity.findOne({ name });
        // if (existingAmenity) {
        //     return res.status(400).json({ error: 'Amenity with the same name already exists.' });
        // }

        // const newAmenity = new Amenity({
        //     name,
        //     description,
        //     icon,
        // });

        // Save the amenity to the database
        const savedAmenity = await Amenity.insertMany(amenities);


        res.status(201).json({amenities: savedAmenity});
    } catch (error) {
        console.error('Error adding amenity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to get all amenities
const getAmenities = async (req, res) => {
    try {
        const amenities = await Amenity.find();

        res.status(200).json({ amenity: amenities });
    } catch (error) {
        console.error('Error getting amenities:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    addAmenity,
    getAmenities,
};
