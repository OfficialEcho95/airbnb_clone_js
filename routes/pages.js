const express = require('express');
const router = express.Router();
const app = express();
const session = require('express-session');
const authenticateToken = require('../middleware/authMiddleware')


//still incomplete

router.get('/notifications', authenticateToken, async (req, res) => {

    const user = req.user;

    const notifications = user.notifications || [];


    req.session.notifications = null;

    res.status(200).json({ notifications })
});