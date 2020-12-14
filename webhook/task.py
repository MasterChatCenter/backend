# Celery
from celery import Celery
import requests
import os

app = Celery('tweet', broker='amqp://' + os.getenv('RABBITMQ_USER') + ':' + os.getenv('RABBITMQ_PASS') + '@rabbitmq:5672')

@app.task
def sendMessage(message):
    requests.post("http://websocket:5000/api/message", json = {
            "senderId":"6ca6747e237e4c19926540ed92504fe9",
            "text":"Hi, I need help with something I bought yesterday",
            "username":"Morty Smith",
            "pageId": "page id"
    })
    return message


@app.task
def publish(message):
    try:
        requests.post("http://api:3000/webhook", json= {
            "senderId": message["sender"]["id"],
            "pageId": message["recipient"]["id"],
            "text": message["message"]["text"]
        })
    except Exception as e:
        print(e)
    