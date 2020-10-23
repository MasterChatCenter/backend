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
  company.hasMany(user, { foreignKey: 'company_id' })
  user.belongsTo(company)

  role.hasMany(user, { foreignKey: 'role_id' })
  user.belongsTo(role)

  user.hasMany(notes, { foreignKey: 'user_id' })
  notes.belongsTo(user)

  user.hasMany(conversation, { foreignKey: 'user_id' })
  conversation.belongsTo(user)

  customer.hasMany(conversation, { foreignKey: 'customer_id' })
  conversation.belongsTo(customer)

  customer.hasMany(notes, { foreignKey: 'customer_id' })
  notes.belongsTo(customer)

  state.hasMany(conversation, { foreignKey: 'state_id' })
  conversation.belongsTo(conversation)

  conversation.hasMany(message, { foreignKey: 'conversation_id' })
  message.belongsTo(conversation)
}

module.exports = { relationSetup }
