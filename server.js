const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
/* const cookieSession = require("cookie-session"); */
require('dotenv').config();
const connectDB = require('./config/db');


const app = express();

// Connect Database
connectDB();

const MongoStore = require('connect-mongo')(session);

//Sessions
app.use(
  session({
    secret: [process.env.COOKIE_KEY],
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
/* app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
); */


// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
//app.use(mids);

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

require('./passport-auth');

app.get('/', (req, res) =>
  res.json({ msg: 'Welcome to the XartUp API...' })
);

//Define Routes
//app.use('/api/users', require('./routes/users'));
app.use('/api/gauth', require('./routes/gauth'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
