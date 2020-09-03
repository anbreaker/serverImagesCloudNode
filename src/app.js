const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const expHbs = require('express-handlebars');
const path = require('path');
const uuid = require('uuid');

// Initializations
const app = express();

// Settings
app.set('port', 3000);

app.set('views', path.join(__dirname, 'views'));
app.engine(
  '.hbs',
  expHbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
  })
);

// view engine setup
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));

// Config Express Data
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Config Multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, callback) => {
    callback(null, uuid.v4() + path.extname(file.originalname));
  },
});

app.use(multer(multer({storage})).single('image'));

// Routes
app.use(require('./routes/routes'));

module.exports = app;
