
# Celery
from celery import Celery
from celery.schedules import crontab
import requests

app = Celery('tweet',broker='amqp://admin:mypass@rabbitmq:5672')

app.conf.beat_schedule = {
    'each 1 min': {
        'task':'task.sendMessage',
        'schedule':crontab(minute='*/1')
    }
}

@app.task
def sendMessage():
    requests.post("http://websocket:5000/api/message", json = {
            "sid":"6ca6747e237e4c19926540ed92504fe9",
            "message":"Hi, I need help with something I bought yesterday",
            "username":"Morty Smith"
    })
    return 6+7

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