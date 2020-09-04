const { models: {
  message
}} = require('../sequelizer')

exports.list = async () => {
  return await message.findAll();
}

exports.getById = async (id) => {
  return await message.findByPk(id);
}

exports.create = async (messageData) => {
  const newMessage = message.create(messageData)
  return newMessage;
}

//TO DO como se actualizaria la contraseña
//TO DO confirmar si se puede actualizar en messageId
exports.update = async (messageData, id) => {
  const updatedMessage = await message.update(messageData, {
    where: {
      id: id
    }
  })
  return updatedMessage;
}

exports.delete = async (id) => {
  const deletedMessage = await message.destroy({
    where: {
      id: id
    }
  });
  return deletedMessage;
}