from flask import Flask, request, make_response
from flask_socketio import SocketIO, join_room, leave_room
import urllib.request as requests
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

socketio = SocketIO(app, logger=True, cors_allowed_origins="*")

"""Endpoint message: is used by task queue to post the message to be sent to agent"""
@app.route('/api/message', methods=['POST'])
def post_message():
    message_to_agent = request.get_json()
    print(message_to_agent['conversation_id'], message_to_agent['text'], message_to_agent["user"])

    socketio.emit('answer', message_to_agent, room=message_to_agent['user'])

    response = make_response({"status":"message has been sent"}, 200)
    return response   


@socketio.on('join')
def on_join(data):
    user_id = data['user']
    join_room(user_id)

    socketio.emit("room_join", { "room": True }, room=user_id)


@socketio.on('connect')
def on_connect():
    print('Client connected :', request.sid)


@socketio.on('disconnect')
def on_disconnect():
    print('Client disconnected', request.sid)


if __name__ == "__main__":
    socketio.run(app, port=5000, host='0.0.0.0' ,debug=False)
