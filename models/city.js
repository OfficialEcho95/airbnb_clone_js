const mongoose = require('mongoose');
const { Schema } = mongoose;

const citySchema = new Schema({
    state: {
        type: Schema.Types.ObjectId,
        ref: 'State',
    },
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('City', citySchema);
