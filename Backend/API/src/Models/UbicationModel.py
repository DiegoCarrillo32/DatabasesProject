from Utils.db import db

class Ubicacion(db.Model):
    __tablename__ = 'UBICACIONES'
    id_ubicacion = db.Column(db.SmallInteger, primary_key=True)
    detalle     = db.Column(db.String(50))
    nombre     = db.Column(db.String(50))
    
    activo = db.relationship("Activos", back_populates="ubicacion")
    
    def __init__(self, detalle, nombre):
        self.detalle = detalle
        self.nombre = nombre
        
        