from Utils.db import db

class Usuarios(db.Model):
    __tablename__ = "USUARIOS"
    id_usuario = db.Column(db.SmallInteger, primary_key=True)
    correo = db.Column(db.String(70))
    area = db.Column(db.String(30))
    
    area = db.relationship("Area", back_populates="user")
    name_user = db.relationship("Nombreusuario", back_populates="user", uselist=False)
    def __init__(self, correo, area):
        self.correo = correo
        self.area = area

class Nombreusuario(db.Model):
    __tablename__ = 'NOMBRE_USUARIO'
    id_usuario = db.Column(db.SmallInteger, 
                           db.ForeignKey(Usuarios.id_usuario),
                           nullable=False,
                           primary_key=True, 
                           autoincrement=False)
    nombre     = db.Column(db.String(50))
    apellido1  = db.Column(db.String(50))
    apellido2  = db.Column(db.String(50))
    #many to one realtionship
    
    user = db.relationship("Usuarios", back_populates="name_user")
    def __init__(self,nombre, apellido1, apellido2):
        self.nombre = nombre
        self.apellido1 = apellido1
        self.apellido2 = apellido2
        # self.id_usuario = id_usuario

