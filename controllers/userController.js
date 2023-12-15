const User = require('../models/user');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/helper');

const createUser = async (req, res) => {
    try {
        const { email, password, last_name, first_name } = req.body;

        // Check if password is provided
        if (!password) {
            return res.status(400).json({ message: "Please enter a password" });
        }

        // Validate other fields
        const find_email = await User.findOne({ email });
        if (find_email) {
            return res.status(400).json({ message: "Email already chosen" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(12);
        const hashed_password = await bcrypt.hash(password, salt);

        // Create and save the user
        const user = await User.create({
            email, password: hashed_password, last_name, first_name
        });

        return res.status(201).json({
            message: `User ${user.first_name} successfully created`
        });
    } catch (err) {
        console.error("Could not create user", err);

        if (err.name === 'ValidationError') {
            // Handle Mongoose validation error
            return res.status(400).json({ message: "Validation error", errors: err.errors });
        }
        
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const find_email = await User.findOne({ email });

        if (!find_email) {
            return res.status(404).json({ message: "Please enter a valid email" });
        }

        const check_password = await bcrypt.compare(password, find_email.password);

        // If passwords match, generate a token
        if (check_password) {
            const token = await generateToken(find_email._id);
            req.session.token = token;

            return res.status(201).json({
                data: token,
                message: "Logged in",
            });
        } else {
            // Passwords don't match
            return res.status(404).json({ message: "Incorrect email or password" });
        }
    } catch (err) {
        console.error("Error logging in user", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}



function logoutUser(req, res) {
    delete req.session.token;
    res.status(200).json({ message: "Logged out" });
}

module.exports = { createUser, loginUser, logoutUser };
