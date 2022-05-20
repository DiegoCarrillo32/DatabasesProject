
from Models.UserModel import Usuarios

from Utils.db import db

class Area(db.Model):
    __tablename__ = 'AREA'
    nombre = db.Column(db.String(30), primary_key=True)
    logo = db.Column(db.String(50))
    encargado = db.Column(db.SmallInteger, db.ForeignKey(Usuarios.id_usuario))
    id_institucion = db.Column(db.SmallInteger)
    user = db.relationship("Usuarios", back_populates="area")
    activo = db.relationship("Activos", back_populates="area")
    
    def __init__(self, nombre, logo, encargado, id_institucion):
        self.nombre = nombre
        self.logo = logo
        self.encargado = encargado
        self.id_institucion = id_institucion
        