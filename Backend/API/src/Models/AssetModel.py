from Models.UbicationModel import Ubicacion
from Models.AreaModel import Area
from Utils.db import db

class Activos(db.Model):
    __tablename__ = 'ACTIVOS'
    id_activo = db.Column(db.SmallInteger, primary_key=True)
    id_ubicacion = db.Column(db.SmallInteger, db.ForeignKey(Ubicacion.id_ubicacion))
    condicion = db.Column(db.String(70))
    area_nombre = db.Column(db.String(30), db.ForeignKey(Area.nombre))
    
    ubicacion = db.relationship("Ubicacion", back_populates="activo")
    area = db.relationship("Area", back_populates="activo")
    type = db.relationship("Tipos", back_populates="asset")
    
    def __init__(self, condicion, area_nombre):
        self.condicion = condicion
        self.area_nombre = area_nombre