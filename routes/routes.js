const express = require('express');
const router = express.Router();
const app = express();

const { createUser, loginUser, logoutUser, updateUser, getUserDetails } = require('../controllers/userController');
const { updatePlace, createPlace, getPlaceById, getPlace, getAllPlace, deletePlace } = require('../controllers/placeController');
const { createCity, getACity, getCity, deleteCity } = require('../controllers/cityController');
const { createState } = require('../controllers/stateController');
const authenticateToken = require('../middleware/authMiddleware');
const user = require('../models/user');
const { addAmenity, getAmenities } = require('../controllers/amenityController');


router.get('/', (req, res) => {
    res.status(200).json({ message: "This is the home page." })
});



router.post('/createUser', createUser);

router.post('/loginUser', loginUser);

router.get('/logoutUser', logoutUser);

// app.use((req, res, next) => authenticateToken(req, res, next, onTokenExpired));

router.get('/dashboard', authenticateToken, (req, res) => {

    // const { userId, name } = req.user;

    // console.log(`User ${name} with ID ${userId} accessed the dashboard.`);

    // Send a response indicating success
    res.status(200).json({ message: 'Dashboard accessed successfully.' });
});

router.put('/updateUser', updateUser);
router.get('/userDetails', getUserDetails);
router.get('/details/:id', getPlaceById);
router.post('/updatePlace', updatePlace);
router.post('/createPlace', createPlace);
router.get('/searchPlace', getPlace);
router.get('/getAllPlace', getAllPlace);
router.delete('/deletePlace/:name', deletePlace);
router.post('/createCity', createCity);
router.post('/createState', createState);
router.get('/allcities', getCity);
router.get('/findcity/:name', getACity);
router.delete('/deletecity/:id', deleteCity);
router.post('/addAmenities', addAmenity);
router.get('/getAmenities', getAmenities);


module.exports = router;
