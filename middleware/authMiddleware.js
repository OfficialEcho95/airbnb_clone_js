const jwt = require('jsonwebtoken');

/*
This script is a middleware that verifies user token
and grants access to user 
*/
const authenticateToken = (req, res, next, onTokenExpired) => {
    // Get token from the header or session
    const token = req.session.token || req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - missing token' });
    }

    // Verify token with expiration time (10 hours)
    jwt.verify(token, 'no-such-thing-as-impossibility', { expiresIn: '10H' }, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                // Execute the callback for token expiration
                onTokenExpired();
                return res.status(401).json({ error: 'Unauthorized - token expired' });
            } else {
                return res.status(401).json({ error: 'Unauthorized - invalid token' });
            }
        }

        if (req.session.userId !== user._id) {
            return res.status(401).json({ error: 'Unauthorized - invalid user' });
        }

        // Attach the user object to the request
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
