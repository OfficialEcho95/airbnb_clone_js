const adminAccess = (req, res, next) => {
    // Check if the user is logged in and has a role
    if (!req.user || !req.user.role) {
        return res.status(403).json({ error: 'Permission denied' });
    }

    // Check if the user is an admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Permission denied - admin access required' });
    }

    // User is an admin, allow the request to proceed
    next();
};

module.exports = adminAccess;