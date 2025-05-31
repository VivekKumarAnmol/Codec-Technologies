require('dotenv').config();
const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', studentRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
