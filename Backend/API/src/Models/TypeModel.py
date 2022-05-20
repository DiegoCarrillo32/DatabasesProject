from API.src.Models.AssetModel import Activos
from Utils.db import db

class Tipos(db.Model):
    __tablename__ = 'TIPOS'
    id_activo = db.Column(db.SmallInteger, db.ForeignKey(Activos.id_activo), primary_key=True)
    placa = db.Column(db.Integer)
    descripcion = db.Column(db.String(150))
    garantia = db.Column(db.String(20))
    
    asset = db.relationship("Activos", back_populates="type")
    def __init__(self, placa, descripcion, garantia):
        self.placa = placa
        self.descripcion = descripcion
        self.garantia = garantia
        