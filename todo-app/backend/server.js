const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/todoDB", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

const register= require("./routes/register")
app.use("/auth", register);

const login=require("./routes/login")
app.use("/auth",login);

const todoRoutes = require("./routes/todo");
app.use("/todos", todoRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
