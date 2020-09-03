
# Celery
from celery import Celery

app = Celery('tweet',broker='amqp://admin:mypass@rabbitmq:5672')

@app.task
def publish(message):
    # sender_id = message["sender"]["id"]
    # print("sender: ",sender_id)
    # # el facebook ID de la pagina que recibe (tu pagina)
    # recipient_id = message["recipient"]["id"]
    # print("page: ",recipient_id)
    # # el texto del mensaje
    # message_text = message["message"]["text"]
    # print("text: ",message_text)
    
    # TO DO add endoitn back and websok
    pass