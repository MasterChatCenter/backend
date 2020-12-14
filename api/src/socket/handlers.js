const userService = require('../services/user');
const jwt = require('../lib/jwt');

exports.joinHandler = async (socket, data) => {
  const { token } = data;
  const { id, error } = jwt.validateToken(token);

  if (!error && id) {
    const user = await userService.getById(id);

    if (user) {
      socket.leave(id);
      socket.join(id);
      const connection = require('./index').connection();
      connection.sendEvent(id, 'join', {
        data: { message: 'Logged in socket!' },
      });
    }
  }
};

exports.leaveHandler = async (socket, data) => {
  const { token } = data;
  const { id, error } = jwt.validateToken(token);

  if (!error && id) {
    socket.leave(id);
  }
};