if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const homeRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log('Successfully connected to mongoose'));

app.use('/', homeRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.listen(process.env.PORT || 3000);
