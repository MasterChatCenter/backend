const { models: {
  conversation,
  message,
  customer
}} = require('../sequelizer')

const UserService = require("./user");
const sequelize = require('../sequelizer');

const filterWhere = (query) => {
  const newQuery = {};
  const keys = Object.getOwnPropertyNames(query);
  keys.forEach((key) => {
    if (query[key]) {
      newQuery[key] = query[key];
    }
  });
  return newQuery;
}

exports.list = async (query) => {
  const { user_id, state } = query;
  const where = filterWhere({ user_id, state });
  return await conversation.findAll({ 
    where,
    attributes: {
      exclude: ['company_id', 'companyId', 'user_id', 'userId', 'customer_id', 'customerId']
    },
    include: [
      {
        model: message,
        attributes: ['id', 'text', 'username', 'is_agent', 'createdAt']
      },
      {
        model: customer,
        attributes: ['id', 'name', 'email', 'sender_id']
      }
    ],
    order: [ [message, 'createdAt', 'ASC'] ],
  });
}

exports.getById = async (id) => {
  return await conversation.findByPk(id);
}

exports.getActive = async (customerId) => {
  const cover = await conversation.findOne({
    where: {
      customer_id: customerId,
      state: 'active'
    }
  })

  return cover
}

exports.getConversationByUserId = async (user_id, state = null) => {
  conversation_query = {
    user_id: user_id
  }

  if(state != 3) {
    conversation_query.state_id = state
  }

  const conver = await conversation.findAll({
    where: conversation_query
  })

  return conver
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
  
  const [user, metadata] = await sequelize.query('SELECT COUNT(conversation.id) as cant, user_id FROM conversation INNER JOIN "user" ON conversation.user_id = "user".id WHERE "user".active = true GROUP BY user_id ORDER BY cant LIMIT 1');

  if (user.length > 0) {
    return user[0].user_id
  }

  return null
}
