from Utils.db import db
class Usuarios(db.Model):
    __tablename__ = 'USUARIOS'
    id_usuario = db.Column(db.SmallInteger, primary_key=True, autoincrement=False)
    correo = db.Column(db.String(70))
    area = db.Column(db.String(30))
    def __init__(self, correo, area, id_usuario):
        self.correo = correo
        self.area = area
        self.id_usuario = id_usuario