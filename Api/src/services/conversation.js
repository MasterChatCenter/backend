const { models: {
  conversation
}} = require('../sequelizer')

const sequelize = require('../sequelizer');

exports.list = async () => {
  return await conversation.findAll();
}

exports.getById = async (id) => {
  return await conversation.findByPk(id);
}

exports.getActive = async (customerId) => {
  const cover = await conversation.findOne({
    where: {
      customer_id: customerId,
      state_id: 1
    }
  })
}

exports.create = async (conversationData) => {
  const newConversation = conversation.create(conversationData)
  return newConversation;
}

exports.update = async (conversationData, id) => {
  const updatedConversation = await conversation.update(conversationData, {
    where: {
      id: id
    }
  })
  return updatedConversation;
}

exports.delete = async (id) => {
  const deletedConversation = await conversation.destroy({
    where: {
      id: id
    }
  });
  return deletedConversation;
}

exports.getUserToCon = async () => {
  const user = await sequelize.query("SELECT COUNT(user_id) as cant, user_id FROM Conversation GROUP BY user_id ORDER BY cant desc")
}
