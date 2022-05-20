from Utils.db import db
class Usuarios(db.Model):
    __tablename__ = 'USUARIOS'
    id_usuario = db.Column(db.SmallInteger, primary_key=True)
    correo = db.Column(db.String(70))
    area = db.Column(db.String(30))
    
    name_user = db.relationship("NombreUsuario", back_populates="user", uselist=False)
    area = db.relationship("Area", back_populates="user")
    def __init__(self, correo, area):
        self.correo = correo
        self.area = area