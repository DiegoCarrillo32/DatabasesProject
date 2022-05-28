from Utils.db import db

class Institucion(db.Model):
    __tablename__ = "INSTITUCIONES"
    id_institucion = db.Column(db.String(40), primary_key=True)
    nombre = db.Column(db.String(50))
    detalle = db.Column(db.String(30))
    usuarios = db.relationship("Usuarios", back_populates="institucion")
    areas = db.relationship("Area", back_populates="institucion")
    def __init__(self, id_institucion, nombre, detalle):
        self.id_institucion = id_institucion
        self.nombre = nombre
        self.detalle = detalle
class Usuarios(db.Model):
    __tablename__ = "USUARIOS"
    id_usuario = db.Column(db.String(40), primary_key=True)
    correo = db.Column(db.String(70))
    contrasena = db.Column(db.String(20))
    id_institucion = db.Column(db.String(40), db.ForeignKey(Institucion.id_institucion))
    
    institucion = db.relationship("Institucion", back_populates="usuarios")
    area = db.relationship("Area", back_populates="user", uselist=False)
    name_user = db.relationship("Nombreusuario", back_populates="user", uselist=False)
    def __init__(self, correo, id_institucion, contrasena, id_usuario):
        self.correo = correo
        self.id_institucion = id_institucion
        self.contrasena = contrasena
        self.id_usuario = id_usuario

        
class Nombreusuario(db.Model):
    __tablename__ = 'NOMBRE_USUARIO'
    id_usuario = db.Column(db.String(40), 
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

