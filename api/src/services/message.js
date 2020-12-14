const { models: {
  message
}} = require('../sequelizer')

const request = require('request');

const customerService = require("./customer");
const conversationService = require('./conversation');

exports.list = async () => {
  return await message.findAll();
}

exports.getById = async (id) => {
  return await message.findByPk(id);
}

exports.create = async (messageData, senderId, tokenFb) => {
  const newMessage = message.create(messageData)

  const data = {
    "recipient": {
        "id": senderId
    },
    "message": {
        "text": messageData.text,
    }
  }
  
  request({
    "uri": "https://graph.facebook.com/me/messages",
    "qs": {
        "access_token": tokenFb
    },
    "method": "POST",
    "json": data
  })

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

exports.weebhook = async (messageData) => {

  let existedCustomer = await customerService.findBySenderId(messageData.senderId);
  if (!existedCustomer) {
    existedCustomer = await customerService.create({ sender_id: messageData.senderId });
  }

  let existedConversationActive = await conversationService.getActive(existedCustomer.id);
  if (!existedConversationActive) {
    let userAvailable = await conversationService.getUserToCon();
    existedConversationActive = await conversationService.create({
      customer_id: existedCustomer.id,
      state: 'active',
      user_id: userAvailable
    })
  }

  const newMessage = await this.create({
    text: messageData.text,
    username: existedCustomer.name,
    is_agent: false,
    conversation_id: existedConversationActive.id
  })

  const socket = require('../socket').connection();
  socket.sendEvent(existedConversationActive.user_id, 'answer', {
    data: {
      username: newMessage.username,
      conversation_id: newMessage.conversation_id,
      text: newMessage.text,
      is_agent: newMessage.is_agent,
      createdAt: newMessage.createdAt,
      senderId: existedCustomer.sender_id
    },
  });

  return { 
    message: newMessage,
    user: existedConversationActive.user_id,
  }
}
