const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { isStrongPassword } = require("../utils/helper");

// Login route
exports.login = async (req, res) => {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
        return res.status(400).json({
            error: "bad_request",
            status: 400,
            msg: "Email and password are required",
        });
    }

    try {
        // Find user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Compare passwords
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            res.status(401).json({ error: "Invalid email or password" });
        }
        const userData = { i_id: user.id, email: user.email };

        const expiresIn = process.env.PASSWORD_EXPIRE_IN_HOUR || "24h";
        const SECRET_KEY = process.env.SECRET_KEY;
        
        // Create and send JWT token
        const accessToken = jwt.sign(userData, SECRET_KEY, {
            expiresIn,
        });
        res.json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: "bad_request",
            status: 400,
            msg: "Email and password are required",
        });
    }

    try {
        // Check password strength
        if (!isStrongPassword(password)) {
            return res.status(400).json({
                error: "weak_password",
                status: 400,
                msg: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await User.create({
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            res.status(400).json({ error: "Email already exists" });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
};
