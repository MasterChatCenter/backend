require('dotenv').config()

const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const logger = require('morgan');
const { info } = require('./utils/debug'); 
const router = require('./routes/router');
const port = process.env.PORT || 3000;
const sequelize = require('./sequelizer');
const stetService = require('./services/state');

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
app.use(logger('dev', { stream: { write: (msg) => info(msg) } }));
app.use(express.urlencoded({extended: false}))

app.use(express.json());

//Connection to database
async function assertDatabaseConnection () {
  console.log('Checking database connection...')
  try {
    await sequelize.authenticate()
    console.log('Database connection OK!')
  } catch (error) {
    console.log('Unable to connect to the database:')
    console.log(error.message)
    process.exit(1)
  }
}

// stetService.defaultData();

// Routes
router(app);

// Start server
// =============================================================================
app.listen(app.get('port'), async function () {
  try {
    await assertDatabaseConnection()
    console.log('Magic happens on port ', app.get('port'));
  } catch (error) {
    console.log('HAY UN ERROR');
  }
});

exports.app = app;