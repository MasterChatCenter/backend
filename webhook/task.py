
# Celery
from celery import Celery
import requests

app = Celery('tweet',broker='amqp://admin:mypass@rabbitmq:5672')

@app.task
def sendMessage(message):
    requests.post("http://websocket:5000/api/message", json = {
            "sid":"6ca6747e237e4c19926540ed92504fe9",
            "message":"Hi, I need help with something I bought yesterday",
            "username":"Morty Smith",
            "msn": message
    })
    return message

@app.task
def publish(message):

    r = requests.post("http://node:3005/webhook", json= {
        "senderId": message["sender"]["id"],
        "pageId": message["recipient"]["id"],
        "text": message["message"]["text"]
    })

    requests.post("http://websocket:5000/api/message", json = {
            "sid":"6ca6747e237e4c19926540ed92504fe9",
            "message":"Hi, I need help with something I bought yesterday",
            "username":"Morty Smith"
    })