function relationSetup (sequelize) {
  const {
    company,
    conversation,
    customer,
    message,
    notes,
    role,
    state,
    user
  } = sequelize.models
  company.hasMany(user)
  role.hasMany(user)
  user.hasMany(conversation)
  customer.hasMany(conversation)
  customer.hasMany(notes)
  state.hasMany(conversation)
  conversation.hasMany(message)
}

module.exports = { relationSetup }
