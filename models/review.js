const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    place_id: {
        type: Schema.Types.ObjectId,
        ref: 'place'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    text: {
        type: String,
    }
}, {
    timestamps: true
  });

module.exports = mongoose.model("Review", reviewSchema)