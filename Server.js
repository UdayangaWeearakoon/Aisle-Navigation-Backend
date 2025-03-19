const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
require('dotenv').config();

//Import routes
const userRoutes = require('./routes/UserRoute');

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

//Use routes
app.use('/users', userRoutes);

const url = process.env.MONGODB_URL;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection success!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});