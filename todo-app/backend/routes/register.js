const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs"); 

const router = express.Router();

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });
        const salt = await bcrypt.genSalt(10); // ✅ Generate salt
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ name, email,password : hashedPassword });
        await newUser.save();

        res.status(201).json({ success: true, message: "Registration successful" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user" });
    }
});

module.exports = router;
