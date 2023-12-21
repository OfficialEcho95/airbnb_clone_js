const express = require('express');
const router = express.Router();
const app = express();

const { createUser, loginUser, logoutUser } = require('../controllers/userController');
const { updatePlace, createPlace, getPlace, getAllPlace, deletePlace  } = require('../controllers/placeController');
const { createCity, getACity, getCity, deleteCity } = require('../controllers/cityController');
const { createState } = require('../controllers/stateController');
const authenticateToken = require('../middleware/authMiddleware');
const user = require('../models/user');


router.get('/', (req, res) => {
    res.status(200).json({message: "This is the home page."})
});



router.post('/createUser', createUser);

router.post('/loginUser', loginUser);

router.get('/logoutUser', logoutUser);

app.use((req, res, next) => authenticateToken(req, res, next, onTokenExpired));

router.get('/dashboard',authenticateToken, (req, res) => {
    console.log('Token expired. Please sign in again.');
    res.redirect('/login');
});

router.post('/updatePlace', updatePlace);
router.post('/createPlace', createPlace);
router.get('/getPlace/:name', getPlace);
router.get('/getAllPlace', getAllPlace);
router.delete('/deletePlace/:name', deletePlace);
router.post('/createCity', createCity);
router.post('/createState', createState);
router.get('/allcities', getCity);
router.get('/findcity/:name', getACity);
router.delete('/deletecity/:id', deleteCity);



module.exports = router;
