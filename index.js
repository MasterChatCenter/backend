const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const port = process.env.PORT || 3005;
require('dotenv').config()

const app = express();
const server = http.createServer(app);

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

app.use(
  bodyParser.json({
    limit: '50mb',
  })
);

// Routes
router(app);

// Start server
// =============================================================================
server.listen(app.get('port'), function () {
  console.log('Magic happens on port ', app.get('port'));
});

exports.app = app;