const express = require("express");
const bcrypt = require("bcryptjs"); // ✅ Used for secure password hashing
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email" }); // ✅ Email not found
        }

        const isMatch = await bcrypt.compare(password, user.password); // ✅ Secure password comparison
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" }); // ✅ Incorrect password
        }

        const token = jwt.sign({ userId: user._id }, "your_jwt_secret", { expiresIn: "3m" }); // ✅ Increased expiry for usability

        res.json({ success: true, token });
    } catch (error) {
        console.error("Login error:", error); // ✅ Logs error for debugging
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
