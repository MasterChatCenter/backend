require('dotenv').config()

const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const port = process.env.PORT || 3005;
require('dotenv').config()

const app = express();

// App configuration
app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept,x-access-token'
  );
  next();
});

app.use(cors());
app.set('port', port);

app.use(express.urlencoded({extended: false}))

app.use(express.json());

// Routes
router(app);

// Start server
// =============================================================================
app.listen(app.get('port'), function () {
  console.log('Magic happens on port ', app.get('port'));
});

exports.app = app;