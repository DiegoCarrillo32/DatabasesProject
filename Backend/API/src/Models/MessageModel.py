from Models.UserModel import Usuarios
from Utils.db import db


class Mensaje(db.Model):
    __tablename__ = 'MENSAJES'
    id_mensaje = db.Column(db.SmallInteger, primary_key=True)
    id_destinatario = db.Column(db.String(40), db.ForeignKey(Usuarios.id_usuario))
    id_remitente = db.Column(db.String(40), db.ForeignKey(Usuarios.id_usuario))
    asunto = db.Column(db.String(75))
    contenido = db.Column(db.String(280))
    
    destinatario = db.relationship("Usuarios", foreign_keys=[id_destinatario])
    remitente = db.relationship("Usuarios", foreign_keys=[id_remitente])
    
    def __init__ (self, id_destinatario, id_remitente, asunto, contenido):
        self.id_destinatario = id_destinatario
        self.id_remitente = id_remitente
        self.asunto = asunto
        self.contenido = contenido
    