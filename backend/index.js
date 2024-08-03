require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const generateContent = require('./routes/getContentRoute');
const app = express();

app.use(express.json());
app.use('/api/generate', generateContent);

app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});
