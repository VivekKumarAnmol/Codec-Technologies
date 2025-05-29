const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

router.get("/:email", async (req, res) => {
    try {
        const todos = await Todo.find({ email: req.params.email });

        if (todos.length === 0) {
            return res.status(404).json({ message: "No tasks found for this user" }); // ✅ Handles empty results
        }

        res.json(todos);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Error fetching tasks" });
    }
});

router.post("/", async (req, res) => {
    const { text, email } = req.body; // ✅ Get email from request body

    if (!email) return res.status(400).json({ message: "User email is required" });

    try {
        const newTask = new Todo({ text, email });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ message: "Error adding task" });
    }
});

router.put("/:id", async (req, res) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { completed: req.body.completed }, { new: true });
    res.json(updatedTodo);
});

router.delete("/:id", async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

module.exports = router;
