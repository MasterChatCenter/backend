from flask import Blueprint, request, jsonify, Response
from dotenv import load_dotenv
import os
import sys
import json
from task import app

load_dotenv()

message_router = Blueprint('weebhook', __name__)

@message_router.route('/webhook', methods=['GET'])
def validateToken():
  # cuando el endpoint este registrado como webhook, debe mandar de vuelta
  # el valor de 'hub.challenge' que recibe en los argumentos de la llamada
  if request.args.get("hub.mode") == "subscribe" and request.args.get("hub.challenge"):
    if not request.args.get("hub.verify_token") == os.environ["VERIFY_TOKEN"]:
      return "Verification token mismatch", 403
    return request.args["hub.challenge"], 200

  return "Nothing to do", 200


"""Test: send a task to celery"""
@message_router.route('/test', methods=['GET'])
def test():
  app.send_task('task.sendMessage', ["This is am argument"])
  return "task has been sent"


@message_router.route('/webhook', methods=['POST'])
def tafic():
  # endpoint para procesar los mensajes que llegan
  data = request.get_json()
  log(data)  # logging, no necesario en produccion

  inteligente = False

  if data["object"] == "page":

    for entry in data["entry"]:
      for messaging_event in entry["messaging"]:

        if messaging_event.get("message"):  # alguien envia un mensaje
          # Se envia el mensaje al worker
          print("New message")
          app.send_task('task.publish', [messaging_event])

    return "ok", 200

def log(message):  # funcion de logging para heroku
  print(str(message))
  sys.stdout.flush()