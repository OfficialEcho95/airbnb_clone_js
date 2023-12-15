const mongoose = require('mongoose');
const { Schema } = mongoose;
const City = require('./city'); // Import the City model

const stateSchema = new Schema({
    name: String,
}, { timestamps: true });

// Pre middleware to remove associated cities when a state is removed
stateSchema.pre('remove', async function (next) {
    try {
        // Remove all cities associated with this state
        await City.deleteMany({ state_id: this._id });
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('State', stateSchema);
