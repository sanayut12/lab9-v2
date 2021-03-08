const express = require('express');
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise

const cors = require('cors')
var config = require('./config/config');
// Use the passport package in our application
app.use(passport.initialize());
app.use(cors())
var passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);

//Import Routes
const authRoute = require('./routes/auth');
const homeRoute = require('./routes/home');
//Connect to DB
mongoose.connect(config.db,
{ useNewUrlParser: true, useUnifiedTopology: true },
() => console.log('Connected to db!')
);
app.use(express.json());
//Middleware
app.use('/api/user', authRoute);
app.use('/api/home', homeRoute);
app.listen(3000, () => console.log('Server up and running'));