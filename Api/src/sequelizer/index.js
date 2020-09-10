const { Sequelize } = require('sequelize')
const { relationSetup } = require('./relationSetup')

const USER = process.env.POSTGRES_USER
const HOST = process.env.POSTGRES_HOST
const DB_NAME = process.env.POSTGRES_DB
const PASS = process.env.POSTGRES_PASSWORD
const PORT = process.env.POSTGRES_PORT
const DB_URI = `postgres://${USER}:${PASS}@${HOST}:${PORT}/${DB_NAME}`
const options = {
  logging: false,
  define: {
    underscored: true,
    charset: 'utf8',
    freezeTableName: true
  }
}
const sequelize = new Sequelize(DB_URI, options)

const modelDefiners = [
  require('./models/company.model'),
  require('./models/conversation.model'),
  require('./models/customer.model'),
  require('./models/message.model'),
  require('./models/notes.model'),
  require('./models/role.model'),
  require('./models/state.model'),
  require('./models/user.model')
]

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize)
}

relationSetup(sequelize)
sequelize.sync({alter: true})

module.exports = sequelize
