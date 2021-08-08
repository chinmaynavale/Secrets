if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const app = express();

const homeRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(
  session({
    secret: 'Our little secret.',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,     
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log('Successfully connected to mongoose'));

app.use('/', homeRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.listen(process.env.PORT || 3000);
