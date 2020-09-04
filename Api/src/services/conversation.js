const { models: {
  conversation
}} = require('../sequelizer')

exports.list = async () => {
  return await conversation.findAll();
}

exports.getById = async (id) => {
  return await conversation.findByPk(id);
}

exports.create = async (conversationData) => {
  const newConversation = conversation.create(conversationData)
  return newConversation;
}

//TO DO como se actualizaria la contraseña
//TO DO confirmar si se puede actualizar en conversationId
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