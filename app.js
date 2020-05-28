const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { userRoutes } = require('./backend/components/user/userAPI');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/user', userRoutes);

module.exports = app;
