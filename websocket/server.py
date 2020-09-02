from flask import Flask, render_template, request
from flask.helpers import make_response
from flask.wrappers import Response
from flask_socketio import SocketIO, emit, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

socketio = SocketIO(app, logger=True, cors_allowed_origins="*")

@app.route('/api/message', methods=['POST'])
def post_message():
    print(request.get_json())
    message_to_agent = request.get_json()
    print(message_to_agent['sid'], message_to_agent['message'])

    socketio.emit('answer', {'data': '{}'.format(message_to_agent['message'])}, room=message_to_agent['sid'])

    response = make_response({"status":"received"}, 200)
    return response
    
    

@socketio.on('client')
def handle_message(message):
    print('received message: ' + message + ' ID: ' + request.sid)
    #emit('answer', {'data': message}, room=request.sid)

@socketio.on('connect')
def test_connect():
    print('connected :', request.sid)

@socketio.on('my_custom')
def my_event(sid):
    emit('answer', {'data': sid})

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected', request.sid)

if __name__ == "__main__":
    socketio.run(app, port=5000, debug=False)