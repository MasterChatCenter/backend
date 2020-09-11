
# Celery
from celery import Celery
import requests

app = Celery('tweet',broker='amqp://admin:mypass@rabbitmq:5672')

@app.task
def publish(message):

    requests.post("http://node:3005/webhook", json= {
        "senderId": message["sender"]["id"],
        "pageId": message["recipient"]["id"],
        "text": message["message"]["text"]
    })

    # TO DO add endoitn back and websok