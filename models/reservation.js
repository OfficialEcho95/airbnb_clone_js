const mongoose = require('mongoose');
const { Schema } = mongoose;

const reservationSchema = new Schema({
    guest: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    place: {
        type: Schema.Types.ObjectId,
        ref: 'Place', 
        required: true,
    },
    dates: {
        checkIn: {
            type: Date,
            required: true,
        },
        checkOut: {
            type: Date,
            required: true,
        },
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'canceled'],
        default: 'pending',
    },
    phone: {
        type: String,
        required: true
    },
    guestsNumber: {
        type: String,
        default: 1
    }
}, {
    timestamps: true,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
