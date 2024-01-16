const express = require('express');
const router = express.Router();
const adminAccess = require('../middleware/adminAccess');

const authenticateToken = require('../middleware/authMiddleware');
const { createReservation, getReservationById, getReservationByName, allUserTrips } = require('../controllers/reservationController')

router.use(authenticateToken); //auth to all method

router.post('/createReservation', createReservation);
router.get('/reservationById/:reservationId', getReservationById);
router.get('/reservationByName/:guestName', adminAccess, getReservationByName);
router.get('/allTrips', allUserTrips);

module.exports = router;
