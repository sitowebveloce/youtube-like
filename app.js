// Require 
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const colors = require('colors');
const ejs = require('ejs');
const helmet = require('helmet');
// App
const app = express();
// Middleware
// Body parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
app.use(helmet());
// View Engine
app.set('view engine', 'ejs');
// Public static folder
app.use(express.static(path.join(__dirname, 'public')));
// External routes
let index = require('./routes/index');
app.use('/', index);

// Listen
let PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server beating 💓 on PORT: ${PORT}`.green);
});