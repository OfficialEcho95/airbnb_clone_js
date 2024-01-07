const mongoose = require('mongoose');
const { Schema } = mongoose;

const placeSchema = new Schema({
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    state: {
        type: Schema.Types.ObjectId,
        ref: 'State',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    number_rooms: {
        type: Number,
        default: 0
    },
    number_bathrooms: {
        type: Number,
        default: 0
    },
    max_guest: {
        type: Number,
        default: 0
    },
    price_by_night: {
        type: Number,
        default: 0
    },
    latitude: {
        type: Number,
        default: 0.0
    },
    longitude: {
        type: Number,
        default: 0.0
    },
    image: {
        type: [String],
        required: true
    },
    ratings: {
        type: Number,
        default: 0
    },
    location: {
        type: String
    },
    // amenities: [{
    //   type: Schema.Types.ObjectId,
    //   ref: 'Amenity'
    // }]
});

module.exports = mongoose.model('Place', placeSchema);
