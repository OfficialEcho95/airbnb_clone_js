// const stripe = require('stripe')('secret_key_API'); //API not available
const bodyParser = require('body-parser');

const Reservation = require('../models/reservation');
const User = require('../models/user');
const Place = require('../models/place');

const createReservation = async (req, res) => {
    try {
        const userId = req.session.userId;

        // Fetch user details based on userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const {
            checkIn,
            checkOut,
            totalAmount,
            status,
            phone,
            guestNumber,
            placeId,
        } = req.body;

        const place = await Place.findById(placeId);

        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }

        const newReservation = new Reservation({
            guest: user,
            place: place,
            dates: { checkIn, checkOut },
            totalAmount,
            status,
            phone,
            guestNumber,
        });

        const createdReservation = await newReservation.save();

        if (!createdReservation) {
            return res.status(400).json({ message: 'Failed to create reservation' });
        }

        return res.status(201).json({ message: 'Reservation created successfully', createdReservation });
    } catch (error) {
        console.error('Error in createReservation:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


//user access to their own reservation
const getReservationById = async (req, res) => {
    try {
        const { reservationId } = req.params;
        const userId = req.session.userId;

        // Fetch the reservation and populate the 'guest' and 'place' field with user details
        const reservation = await Reservation.findById(reservationId).populate('guest').populate('place');

        // Check if the reservation exists
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        // Check if the user has permission to access the reservation
        if (reservation.guest._id.toString() !== userId) {
            return res.status(403).json({ message: 'Permission denied' });
        }

        // access the guest's details
        const guestFirstName = reservation.guest.first_name;
        const guestLastName = reservation.guest.last_name;

        return res.status(200).json({ reservation, guestFirstName, guestLastName });
    } catch (error) {
        console.error('Error fetching reservation:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


//gets the user all their trips
const allUserTrips = async (req, res) => {
    try {
        const userId = req.session.userId;

        // Fetch reservations from the database for the specific user
        const userTrips = await Reservation.find({ 'guest': userId }).populate('place');

        if (userTrips.length > 0) {
            return res.status(200).json({ userTrips });
        } else {
            return res.status(200).json({ message: "No trips booked...yet!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


//this provides the admin access to query the database
const getReservationByName = async (req, res) => {
    try {
        const { guest } = req.params;

        // Fetch the guest based on their first name
        const guestUser = await User.findOne({ first_name: guest });

        // Check if the guest exists
        if (!guestUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch the reservation and populate the 'guest' field with user details
        const reservation = await Reservation.findOne({ guest: guestUser._id })
            .populate('guest');

        // Check if the reservation exists
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        return res.status(200).json({ reservation });
    } catch (error) {
        console.error('Error fetching reservation:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// payment implementation
// const reservationPayment = async (req, res) => {
//     const userId = req.session.userId;
//     const { reservationId, totalAmount } = req.body;

//     if (!userId) {
//         res.status(404).json({ message: "User not found" });
//         return;
//     }

//     try {
//         const reservation = await Reservation.findById(reservationId);

//         if (!reservation) {
//             res.status(404).json({ message: "Reservation not found" });
//             return;
//         }

//         // Check if the logged-in user is the guest of the reservation
//         if (reservation.guest.toString() === userId) {

//             console.log(reservation._id); // This should return the reservation id
//             console.log(totalAmount); // This should return the total amount

//             const paymentIntent = await stripe.paymentIntents.create({
//                 amount: totalAmount * 100,  // since stripe amounts are in cents
//                 currency: 'usd',
//                 description: `Reservation payment for ${reservationId}`,
//             });

//             res.json({ clientSecret: paymentIntent.client_secret });
//         } else {
//             res.status(403).json({ message: "Unauthorized access to reservation" });
//         }
//     } catch (error) {
//         console.error("Error fetching reservation:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };


// app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
//     const sig = req.headers['stripe-signature'];
//     let event;
  
//     try {
//       event = stripe.webhooks.constructEvent(req.body, sig, 'stripe_endpoint_secret'); //API keys not yet available
//     } catch (err) {
//       console.error('Webhook error:', err.message);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }
  
//     // Handle the event
//     switch (event.type) {
//       case 'payment_intent.succeeded':
//         const paymentIntent = event.data.object;
//         // Handle successful payment
//         console.log('PaymentIntent was successful:', paymentIntent);
//         break;
//       default:
//         // Unexpected event type
//         return res.status(400).end();
//     }
  
//     res.status(200).end();
//   });
  
  


module.exports = {
    createReservation, getReservationById,
    getReservationByName,
    allUserTrips,
};
