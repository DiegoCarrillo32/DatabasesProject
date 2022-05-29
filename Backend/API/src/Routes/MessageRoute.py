from flask import Blueprint, jsonify, make_response, request
from sqlalchemy import exc

#Models
from Models.MessageModel import Mensaje

#Schemas

#Utils
from Utils.db import db

messages = Blueprint('messages', __name__)

@messages.route('/messages/<id_usr>', methods=['GET'])
def get_messages(id_usr):
    
    messages = Mensaje.query.filter_by(id_destinatario=id_usr).all()
    messages_list = []
    
    for message in messages:
        nombre_desti = message.destinatario.name_user.nombre
        
        apellido_desti = message.destinatario.name_user.apellido1
        nombre_remi = ''
        apellido_remi = ''
        if(message.remitente != None):
            apellido_remi = message.remitente.name_user.apellido1
            nombre_remi= message.remitente.name_user.nombre
        
        message_info = {
            "id": message.id_mensaje,
            "id_destinatario": message.id_destinatario,
            "id_remitente": str(message.id_remitente),
            "nombre_desti": nombre_desti,
            "nombre_remi":nombre_remi,
            "apellido_desti": apellido_desti,
            "apellido_remi":apellido_remi,
            "subject": message.asunto,
            "content": message.contenido,     
        }
        messages_list.append(message_info)
        
    
        
    return make_response(jsonify(messages_list), 200)
    

