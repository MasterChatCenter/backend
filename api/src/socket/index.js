const http = require('http');
const { joinHandler, leaveHandler } = require('./handlers');

let connection = null;

class Socket {
  constructor() {
    this._socket = null;
  }

  connect(server) {
    const io = require('socket.io')(server, {
      cors: {
        origin: '*',
      }
    });
    console.log('Starting new socket...');
    /*const io = require('socket.io')(http, {
      pingInterval: 200,
      pingTimeout: 10000,
      origins: '*:*',
    }).listen(server);*/

    this._socket = io;

    io.on('connection', (socket) => {
      console.log(`New socket connection: ${socket.id}`);

      // Events
      socket.on('join', (data) => {
        joinHandler(socket, data);
      });

      socket.on('leave', (data) => {
        leaveHandler(socket, data);
      });
    });
  }

  sendEvent(room, event, data) {
    this._socket.in(room).emit(event, data);
  }

  static init(server) {
    if (!connection) {
      connection = new Socket();
      connection.connect(server);
    }
  }

  static getConnection() {
    if (!connection) {
      console.log('No active connection!');
    }
    return connection;
  }
}

module.exports = {
  connect: Socket.init,
  connection: Socket.getConnection,
};