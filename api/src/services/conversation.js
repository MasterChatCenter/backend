const { models: {
  conversation
}} = require('../sequelizer')

const UserService = require("./user");
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

  return cover
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

  const free_user = await UserService.getUserWitoutCOnversation()

  if (free_user) {
    return free_user
  }

  const [user, metadata] = await sequelize.query("SELECT COUNT(user_id) as cant, user_id FROM Conversation GROUP BY user_id ORDER BY cant LIMIT 1");
  
  if (user.length > 0) {
    return user[0].user_id
  }

  return null
}
