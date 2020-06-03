const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const { userRoutes } = require('./backend/components/user/userAPI');
const { reportRoutes } = require('./backend/components/report/reportAPI');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/user', userRoutes);
app.use('/api/reports', reportRoutes);

module.exports = app;
