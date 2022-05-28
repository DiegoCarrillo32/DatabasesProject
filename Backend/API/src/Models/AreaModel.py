
from Models.UserModel import Institucion
from Models.UserModel import Usuarios

from Utils.db import db

class Area(db.Model):
    __tablename__ = 'AREA'
    id_area = db.Column(db.SmallInteger, primary_key=True)
    nombre = db.Column(db.String(30))
    logo = db.Column(db.String(50))
    encargado = db.Column(db.String(40), db.ForeignKey(Usuarios.id_usuario))
    id_institucion = db.Column(db.String(40), db.ForeignKey(Institucion.id_institucion))
    
    institucion = db.relationship("Institucion", back_populates="areas")
    user = db.relationship("Usuarios", back_populates="area", uselist=False)
    activo = db.relationship("Activos", back_populates="area")
    
    def __init__(self, nombre, logo, encargado, id_institucion):
        self.nombre = nombre
        self.logo = logo
        self.encargado = encargado
        self.id_institucion = id_institucion
        