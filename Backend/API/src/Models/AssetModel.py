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
    loan = db.relationship("Prestamos", back_populates="asset")
    
    def __init__(self, condicion, area_nombre):
        self.condicion = condicion
        self.area_nombre = area_nombre
        

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
        
class Prestamos(db.Model):
    __tablename__ = 'PRESTAMOS'
    id_prestamo = db.Column(db.SmallInteger, primary_key=True)
    id_activo = db.Column(db.SmallInteger, db.ForeignKey(Activos.id_activo))
    estado = db.Column(db.String(50))
    tiempo_pr =  db.Column(db.Date)
    fecha_so = db.Column(db.Date)
    fecha_de = db.Column(db.Date)
    
    asset = db.relationship(Activos, back_populates='loan')
    
    def __init__(self, id_activo, estado, tiempo_pr, fecha_so, fecha_de):
        self.id_activo = id_activo
        self.estado = estado
        self.tiempo_pr = tiempo_pr
        self.fecha_so = fecha_so
        self.fecha_de = fecha_de
