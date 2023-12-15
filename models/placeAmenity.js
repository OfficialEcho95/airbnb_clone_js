const mongoose = require('mongoose');
const { Schema } = mongoose;

const amenityPlaceSchema = new Schema({
    place_id: {
        type: Schema.Types.ObjectId,
        ref: 'Place'
    },
 
amenity_id: {
        type: Schema.Types.ObjectId,
        ref: 'Amenity'
    },
}, { timestamps: true });

module.exports = mongoose.model('AmenityPlace', amenityPlaceSchema);