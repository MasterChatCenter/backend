from flask import Flask, request
from flask.helpers import make_response
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

socketio = SocketIO(app, logger=True, cors_allowed_origins="*")

"""Endpoint message: is used by task queue to post the message to be sent to agent"""
@app.route('/api/message', methods=['POST'])
def post_message():
    message_to_agent = request.get_json()
    print(message_to_agent['sid'], message_to_agent['message'])

    socketio.emit('answer', {'data': '{}'.format(message_to_agent['message'])}, room=message_to_agent['sid'])

    response = make_response({"status":"message has been sent"}, 200)
    return response   


@socketio.on('client')
def handle_message(message):
    print('received message: ' + message + ' ID: ' + request.sid)
    #emit('answer', {'data': message}, room=request.sid)

@socketio.on('connect')
def test_connect():
    print('Client connected :', request.sid)

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected', request.sid)

if __name__ == "__main__":
    socketio.run(app, port=5000, debug=False)