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
    print(message_to_agent['senderId'], message_to_agent['text'])

    socketio.emit('answer', message_to_agent, room=message_to_agent['username'])

    response = make_response({"status":"message has been sent"}, 200)
    return response   

def request_user():
    response = requests.urlopen('https://rickandmortyapi.com/api/character/2')
    data = response.read()
    username = json.loads(data.decode('utf-8'))['name']
    return username

@socketio.on('client')
def handle_message(message):
    print('received message: ' + message + ' ID: ' + request.sid)

@socketio.on('join')
def on_join(data):
    room = request_user()
    username = data['username']
    join_room(room)

    #send(username + ' has entered the room.', room=room)


@socketio.on('connect')
def test_connect():
    print('Client connected :', request.sid)

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected', request.sid)

if __name__ == "__main__":
    socketio.run(app, port=5000, host='0.0.0.0' ,debug=False)