from Utils.db import db
from Models.UserModel import Institucion

class Ubicacion(db.Model):
    __tablename__ = 'UBICACIONES'
    id_ubicacion = db.Column(db.SmallInteger, primary_key=True)
    id_institucion = db.Column(db.String(40), db.ForeignKey(Institucion.id_institucion))
    detalle     = db.Column(db.String(50))
    nombre     = db.Column(db.String(50))
    
    activo = db.relationship("Activos", back_populates="ubicacion")
    
    def __init__(self, detalle, nombre):
        self.detalle = detalle
        self.nombre = nombre
        
        