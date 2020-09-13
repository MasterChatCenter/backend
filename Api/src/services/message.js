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

  let ownCustomer = await customerService.findBySenderId(messageData.senderId);
  
  if (!ownCustomer) {
    ownCustomer = await customerService.create({ senderId: messageData.senderId });
  }

  let activeCon = await conversationService.getActive(ownCustomer.id)
  
  if (!activeCon) {
    
    let asUser = await conversationService.getUserToCon();
    activeCon = await conversationService.create({
      startDate: Date.now(),
      customer_id: ownCustomer.id,
      state_id: 1,
      user_id: asUser.id,
    })
  }

  const newMessage = await this.create({
    ...messageData,
    sendDate: Date.now(),
    conversation_id: activeCon.id
  })

  return { 
    message: newMessage,
    user: activeCon.user_id,
  }
}
