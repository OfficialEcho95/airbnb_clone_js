const mongoose = require('mongoose');
const {Schema} = mongoose;

const amenitySchema = new Schema ({
    name: String,
}, {timestamps: true});

module.exports = mongoose.model('Amenity', amenitySchema);