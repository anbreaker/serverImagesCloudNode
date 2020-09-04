const exphbs = require('express-handlebars');
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

// Initializations
const app = express();
require('./database');

// Settings
app.set('port', process.env.PORT || 4000);

// Set views, with path
app.set('views', path.join(__dirname, 'views'));

// Express-handlebars configuration for use mode views
app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
  })
);

console.log('------------->', __dirname + '/views/layouts/');

// Template engine configuration
app.set('view engine', '.hbs');

// Middlewares
// Use module Morgan to see request Http
app.use(morgan('dev'));

// Form sends data, understand it, but not accept images etc...(Method of Express)
app.use(express.urlencoded({extended: false}));

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
