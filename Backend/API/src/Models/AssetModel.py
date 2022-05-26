from Models.UbicationModel import Ubicacion
from Models.AreaModel import Area
from Utils.db import db

class Activos(db.Model):
    __tablename__ = 'ACTIVOS'
    id_activo = db.Column(db.SmallInteger, primary_key=True)
    id_ubicacion = db.Column(db.SmallInteger, db.ForeignKey(Ubicacion.id_ubicacion))
    id_area = db.Column(db.SmallInteger, db.ForeignKey(Area.id_area))
    nombre_activo = db.Column(db.String(20))
    
    ubicacion = db.relationship("Ubicacion", back_populates="activo")
    area = db.relationship("Area", back_populates="activo")
    type = db.relationship("Tipos", back_populates="asset")
    loan = db.relationship("Prestamos", back_populates="asset")
    
    def __init__(self, id_ubicacion, id_area, nombre_activo):
        self.id_ubicacion = id_ubicacion
        self.id_area = id_area
        self.nombre_activo = nombre_activo
    
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
    estado = db.Column(db.Boolean)
    fecha_so = db.Column(db.Date)
    fecha_de = db.Column(db.Date)
    
    asset = db.relationship(Activos, back_populates='loan')
    
    def __init__(self, id_activo, estado, fecha_so, fecha_de):
        self.id_activo = id_activo
        self.estado = estado
        self.fecha_so = fecha_so
        self.fecha_de = fecha_de
